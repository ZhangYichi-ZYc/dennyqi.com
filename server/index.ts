import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import remarkRehype from 'remark-rehype'
import katex from 'katex'
import { visit } from 'unist-util-visit'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

const app = express()
const PORT = 42210

app.use(cors())
app.use(express.json())

const NOTES_ROOT = path.resolve(import.meta.dirname, '..', 'notes')

// ---- Auth ----
const PASSWORD_FILE = path.resolve(import.meta.dirname, '.password')
const WHITELIST_FILE = path.resolve(import.meta.dirname, 'whitelist.txt')
const CORRECT_PASSWORD = fs.readFileSync(PASSWORD_FILE, 'utf-8').trim()

let whitelist: Set<string> = new Set()
function loadWhitelist() {
  try {
    const raw = fs.readFileSync(WHITELIST_FILE, 'utf-8')
    whitelist = new Set(
      raw.split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('#'))
    )
  } catch {
    whitelist = new Set()
  }
}
loadWhitelist()

// Active tokens: token → timestamp
const tokens = new Map<string, number>()
const TOKEN_TTL = 24 * 60 * 60 * 1000 // 24 hours

function createToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Check if a note path is whitelisted
function isWhitelisted(notePath: string): boolean {
  return whitelist.has(notePath)
}

// Auth check for protected content
function checkAuth(req: express.Request): boolean {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) return false
  const token = auth.slice(7)
  const ts = tokens.get(token)
  if (!ts) return false
  if (Date.now() - ts > TOKEN_TTL) {
    tokens.delete(token)
    return false
  }
  return true
}

// ---- Markdown → HTML pipeline (unified + remark + rehype) ----

// Extract \newcommand{\cmd}{def} from within math environments only
function extractMacros(text: string): { cleaned: string; macros: Record<string, string> } {
  const macros: Record<string, string> = {}

  function stripNewcommand(match: string): string {
    return match.replace(/\\newcommand\{(\\[^}]+)\}\{([^}]*)\}/g, (_, cmd: string, def: string) => {
      macros[cmd] = def
      return ''
    })
  }

  // $$...$$ display math
  let cleaned = text.replace(/\$\$([\s\S]*?)\$\$/g, stripNewcommand)
  // $...$ inline math
  cleaned = cleaned.replace(/(?<!\$)\$(?!\$)([^$]+?)\$(?!\$)/g, stripNewcommand)
  // \[...\] display LaTeX
  cleaned = cleaned.replace(/\\\[([\s\S]*?)\\\]/g, stripNewcommand)
  // \(...\) inline LaTeX
  cleaned = cleaned.replace(/\\\(([\s\S]*?)\\\)/g, stripNewcommand)

  // Clean up math blocks left empty after newcommand removal
  cleaned = cleaned.replace(/\$\$(?:\s*\n?)*\$\$/g, '')
  cleaned = cleaned.replace(/\$\$/g, '')

  return { cleaned, macros }
}

// Custom rehype plugin: collect macros + render KaTeX math
// Uses marker approach since rehype-stringify escapes raw HTML
function rehypeKatexMacros() {
  return (tree: any, file: any) => {
    const macros = file.data.macros || {}
    const rendered: string[] = []
    file.data.rendered = rendered

    visit(tree, (node: any, index: number | null, parent: any) => {
      if (node.type !== 'element' || node.tagName !== 'code') return
      const classes: string[] = node.properties?.className || []
      const isInline = classes.includes('math-inline')
      const isDisplay = classes.includes('math-display')
      if (!isInline && !isDisplay) return

      const firstChild = node.children?.[0]
      if (!firstChild || firstChild.type !== 'text') return

      const tex = String(firstChild.value || '').trim()
      if (!tex) return

      try {
        const html = katex.renderToString(tex, {
          displayMode: isDisplay,
          throwOnError: false,
          macros,
          trust: true,
          strict: false,
        })
        // Replace <code> with text marker — we'll swap in the real HTML after stringify
        if (parent && typeof index === 'number') {
          const marker = `KATEXMK${rendered.length}END`
          rendered.push(isDisplay ? `\n${html}\n` : html)
          parent.children[index] = { type: 'text', value: marker }
        }
      } catch {
        // leave as-is on error
      }
    })
  }
}

// Post-process: swap markers back to KaTeX HTML
function restoreKatex(html: string, rendered: string[]): string {
  return html.replace(/KATEXMK(\d+)END/g, (_, i) => {
    const idx = parseInt(i)
    return rendered[idx] || ''
  })
}

// Mirrors NextChat's approach: AST-level math handling avoids regex issues
const processor = unified()
  .use(remarkParse)       // Parse markdown → mdast
  .use(remarkMath)        // Parse $...$ and $$...$$ as math nodes
  .use(remarkGfm)         // GFM: tables, strikethrough, task lists, autolinks
  .use(remarkBreaks)      // Single newline → hard break
  .use(remarkRehype)      // mdast → hast
  .use(rehypeKatexMacros) // Render math with \newcommand macros
  .use(rehypeHighlight)   // Code syntax highlighting
  .use(rehypeStringify)   // Serialize → HTML string

// ---- escapeBrackets: convert \(…\) / \[…\] to $…$ / $$…$$ (from NextChat) ----
function escapeBrackets(text: string): string {
  const pattern =
    /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\\]|\\\((.*?)\\\)/g
  return text.replace(
    pattern,
    (match, codeBlock, squareBracket, roundBracket) => {
      if (codeBlock) {
        return codeBlock
      } else if (squareBracket) {
        return `$$${squareBracket}$$`
      } else if (roundBracket) {
        return `$${roundBracket}$`
      }
      return match
    },
  )
}

// ---- Excluded directory names ----
const EXCLUDE_DIRS = new Set(['tmp', 'old', 'word', '练习题'])

interface NoteNode {
  name: string
  type: 'directory' | 'file'
  path?: string
  children?: NoteNode[]
  isProtected?: boolean
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
        isProtected: !isWhitelisted(relativePath),
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

// POST /api/auth — validate password, return token
app.post('/api/auth', (req, res) => {
  const { password } = req.body
  if (password === CORRECT_PASSWORD) {
    const token = createToken()
    tokens.set(token, Date.now())
    res.json({ token })
  } else {
    res.status(401).json({ error: 'Invalid password' })
  }
})

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
app.get('/api/notes/content', async (req, res) => {
  try {
    const notePath = req.query.path as string
    if (!notePath) {
      res.status(400).json({ error: 'Missing path parameter' })
      return
    }

    // Auth: skip for whitelisted paths
    if (!isWhitelisted(notePath) && !checkAuth(req)) {
      res.status(401).json({ error: 'Authentication required' })
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
    const escaped = escapeBrackets(raw)
    const { cleaned, macros } = extractMacros(escaped)
    const result = await processor.process({
      value: cleaned,
      data: { macros },
    })
    let html = String(result)
    // Swap KaTeX markers back to real HTML
    html = restoreKatex(html, (result.data as any).rendered || [])

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
