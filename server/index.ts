import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const app = express()
const PORT = 42210

app.use(cors())
app.use(express.json())

const NOTES_ROOT = path.resolve(import.meta.dirname, '..', 'notes')

// ---- Math protection: shield LaTeX from markdown-it ----
const MATH_P = 'MATHBLOCK'

function protectMath(text: string): { text: string; blocks: string[] } {
  const blocks: string[] = []

  // Replace $$...$$ display math first
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    blocks.push(`$$${math}$$`)
    return `\n${MATH_P}${blocks.length - 1}END\n`
  })

  // Replace $...$ inline math (not preceded/followed by $)
  // Allow newlines — some editors wrap long math expressions
  text = text.replace(/(?<!\$)\$(?!\$)([^$]+?)\$(?!\$)/g, (_, math) => {
    blocks.push(`$${math}$`)
    return `${MATH_P}${blocks.length - 1}END`
  })

  return { text, blocks }
}

function restoreMath(html: string, blocks: string[]): string {
  // markdown-it may wrap the placeholder in <p> tags or add HTML entities
  // First undo any HTML-wrapping around display math placeholders
  html = html.replace(new RegExp(`<p>${MATH_P}(\\d+)END</p>`, 'g'), (_, i) => blocks[parseInt(i)])
  // Then handle any remaining (inline) placeholders
  html = html.replace(new RegExp(`${MATH_P}(\\d+)END`, 'g'), (_, i) => blocks[parseInt(i)])
  return html
}

// ---- Markdown renderer ----
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch {
        // fall through
      }
    }
    return '' // use external highlight
  },
})

// ---- Excluded directory names ----
const EXCLUDE_DIRS = new Set(['tmp', 'old', 'word', '练习题'])

interface NoteNode {
  name: string
  type: 'directory' | 'file'
  path?: string
  children?: NoteNode[]
}

function buildTree(dirPath: string): NoteNode[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  const nodes: NoteNode[] = []

  for (const entry of entries) {
    if (entry.name.startsWith('.') || EXCLUDE_DIRS.has(entry.name)) continue

    if (entry.isDirectory()) {
      const children = buildTree(path.join(dirPath, entry.name))
      if (children.length > 0) {
        nodes.push({
          name: stripNumberPrefix(entry.name),
          type: 'directory',
          children,
        })
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const relativePath = path.relative(NOTES_ROOT, path.join(dirPath, entry.name))
      nodes.push({
        name: stripNumberPrefix(entry.name.replace(/\.md$/, '')),
        type: 'file',
        path: relativePath,
      })
    }
  }

  // Sort: directories first, then files; each group alphabetically
  nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'directory' ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  return nodes
}

function stripNumberPrefix(name: string): string {
  return name.replace(/^\d{2}\s*/, '')
}

// ---- API Routes ----

// GET /api/notes/tree
app.get('/api/notes/tree', (_req, res) => {
  try {
    const tree = buildTree(NOTES_ROOT)
    res.json(tree)
  } catch (err) {
    console.error('Failed to build tree:', err)
    res.status(500).json({ error: 'Failed to read notes directory' })
  }
})

// GET /api/notes/content?path=...
app.get('/api/notes/content', (req, res) => {
  try {
    const notePath = req.query.path as string
    if (!notePath) {
      res.status(400).json({ error: 'Missing path parameter' })
      return
    }

    const fullPath = path.join(NOTES_ROOT, notePath)
    // Security: ensure the resolved path is inside NOTES_ROOT
    if (!fullPath.startsWith(NOTES_ROOT)) {
      res.status(403).json({ error: 'Forbidden' })
      return
    }
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
      res.status(404).json({ error: 'Note not found' })
      return
    }

    const raw = fs.readFileSync(fullPath, 'utf-8')
    const { text: protectedText, blocks } = protectMath(raw)
    let html = md.render(protectedText)
    html = restoreMath(html, blocks)

    // Derive category from directory path
    const dirParts = path.dirname(notePath).split(path.sep)
    const category = dirParts.map(stripNumberPrefix).join(' / ')

    res.json({
      title: stripNumberPrefix(path.basename(notePath, '.md')),
      path: notePath,
      html,
      category: category || 'Notes',
    })
  } catch (err) {
    console.error('Failed to read note:', err)
    res.status(500).json({ error: 'Failed to read note' })
  }
})


	// ---- Production static serving + SPA fallback ----
	const DIST_DIR = path.resolve(import.meta.dirname, '..', 'dist')
	if (fs.existsSync(DIST_DIR)) {
	  app.use(express.static(DIST_DIR))
	  // SPA fallback: all non-API routes return index.html
	  app.get('*', (_req, res) => {
	    res.sendFile(path.join(DIST_DIR, 'index.html'))
	  })
	  console.log(`Serving frontend from ${DIST_DIR}`)
	}

app.listen(PORT, () => {
  console.log(`Notes API server running at http://localhost:${PORT}`)
})
