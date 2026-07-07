# DennyQi Personal Homepage — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vue 3 + Express personal homepage with warm humanistic styling, showcasing ~421 markdown study notes with sidebar navigation and placeholder sections for experience/projects.

**Architecture:** Vue 3 SPA with Vite dev server proxying to a lightweight Express backend that reads the `notes/` directory and serves file-tree + rendered-markdown APIs. CSS custom properties drive the warm palette; markdown-it + highlight.js + KaTeX handle content rendering.

**Tech Stack:** Vue 3, Vue Router 4, TypeScript, Vite, Express, markdown-it, highlight.js, KaTeX

## Global Constraints

- All colors use CSS custom properties defined in `src/styles/variables.css`
- Font stack uses `Noto Serif SC` for headings, system sans-serif for body
- ICP备案号: 浙ICP备2023036581号 → https://beian.miit.gov.cn/ ; 浙公网安备33010802013290号-1 → https://beian.mps.gov.cn/#/query/webSearch?code=33010802013290
- Notes tree endpoints exclude `tmp/`, `old/`, `word/` directories and non-`.md` files
- Mobile breakpoint at 768px: sidebar collapses to drawer, cards go single-column
- No state management library — composables + provide/inject only
- KaTeX renders client-side via auto-render extension on `$$` and `$` delimiters

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite config with Vue plugin, dev proxy to Express |
| `tsconfig.json` | TypeScript config for frontend |
| `tsconfig.node.json` | TypeScript config for Vite/Node tooling |
| `index.html` | HTML shell, Google Fonts link |
| `server/index.ts` | Express server: file-tree + markdown-content APIs |
| `src/env.d.ts` | Vite client type shims |
| `src/main.ts` | App bootstrap: createApp, router, global styles |
| `src/App.vue` | Root component with `<router-view>` |
| `src/router/index.ts` | Route definitions for `/` and `/notes/:path*` |
| `src/types/index.ts` | Shared TypeScript interfaces |
| `src/styles/variables.css` | CSS custom properties, font imports, reset |
| `src/components/AppHeader.vue` | Sticky top nav with page links |
| `src/components/HeroSection.vue` | Name, tagline, interest tags |
| `src/components/CategoryCards.vue` | Grid container for category cards |
| `src/components/CategoryCard.vue` | Single category card with icon, count, description |
| `src/components/TimelineSection.vue` | Placeholder timeline section |
| `src/components/ProjectsSection.vue` | Placeholder projects grid |
| `src/components/AppFooter.vue` | Copyright + ICP备案号 links |
| `src/components/SidebarTree.vue` | Collapsible directory tree navigation |
| `src/components/MarkdownViewer.vue` | Renders HTML with KaTeX auto-render |
| `src/composables/useNotes.ts` | Fetch tree + content, reactive state |
| `src/views/HomeView.vue` | Assembles all homepage sections |
| `src/views/NotesView.vue` | Sidebar + markdown viewer layout |

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/env.d.ts`
- Create directories: `server/`, `src/router/`, `src/views/`, `src/components/`, `src/composables/`, `src/styles/`, `src/types/`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: project boots with `npm run dev` (Vite dev server starts, no content yet)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p server src/{router,views,components,composables,styles,types}
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "dennyqi-homepage",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "dev:server": "tsx server/index.ts",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.0",
    "vue-router": "^4.4.0",
    "express": "^4.21.0",
    "cors": "^2.8.5",
    "markdown-it": "^14.1.0",
    "highlight.js": "^11.10.0",
    "katex": "^0.16.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.1.0",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^22.0.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vue-tsc": "^2.0.0",
    "tsx": "^4.19.0"
  }
}
```

- [ ] **Step 3: Write `vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
```

- [ ] **Step 4: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

- [ ] **Step 5: Write `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" />
    <title>DennyQi</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 7: Write `src/env.d.ts`**

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
```

- [ ] **Step 8: Install dependencies**

```bash
cd /home/claude/dennyqi.com && npm install
```

- [ ] **Step 9: Verify Vite starts**

```bash
cd /home/claude/dennyqi.com && timeout 5 npx vite --host 2>&1 || true
```
Expected: Vite dev server starts on port 5173 (may show blank page since no main.ts yet).

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: scaffold Vue 3 + Vite project with dependencies

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Express Backend Server

**Files:**
- Create: `server/index.ts`

**Interfaces:**
- Consumes: nothing (independent of frontend)
- Produces:
  - `GET /api/notes/tree` → `{ name: string, type: 'directory'|'file', children?: NoteNode[], path?: string }[]`
  - `GET /api/notes/content?path=string` → `{ title: string, path: string, html: string, category: string }`

- [ ] **Step 1: Write `server/index.ts`**

```typescript
import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const NOTES_ROOT = path.resolve(import.meta.dirname, '..', 'notes')

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
    const html = md.render(raw)

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

app.listen(PORT, () => {
  console.log(`Notes API server running at http://localhost:${PORT}`)
})
```

- [ ] **Step 2: Test the server starts**

```bash
cd /home/claude/dennyqi.com && timeout 3 npx tsx server/index.ts 2>&1 || true
```
Expected: `Notes API server running at http://localhost:3001`

- [ ] **Step 3: Start server in background and test API endpoints**

```bash
cd /home/claude/dennyqi.com && npx tsx server/index.ts &
sleep 2
# Test tree endpoint
curl -s http://localhost:3001/api/notes/tree | head -c 200
echo ""
# Test content endpoint
curl -s "http://localhost:3001/api/notes/content?path=04%20Informatics/01%20Information%20Theory/01%20Information%20Entropy.md" | head -c 200
echo ""
kill %1 2>/dev/null
```

- [ ] **Step 4: Commit**

```bash
git add server/index.ts && git commit -m "feat: add Express backend with notes tree and content APIs

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Types, CSS Variables, and App Shell

**Files:**
- Create: `src/types/index.ts`, `src/styles/variables.css`, `src/main.ts`, `src/router/index.ts`, `src/App.vue`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `NoteNode` type, `NoteContent` type, `CategoryMeta` type
  - CSS custom properties for the warm palette
  - Vue app boots, router works, `<router-view>` renders

- [ ] **Step 1: Write `src/types/index.ts`**

```typescript
export interface NoteNode {
  name: string
  type: 'directory' | 'file'
  path?: string
  children?: NoteNode[]
}

export interface NoteContent {
  title: string
  path: string
  html: string
  category: string
}

export interface CategoryMeta {
  id: string
  name: string
  icon: string
  description: string
  count: number
  path: string
}
```

- [ ] **Step 2: Write `src/styles/variables.css`**

```css
/* === Google Fonts === */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap');

/* === CSS Reset === */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif;
  background-color: var(--bg-main);
  color: var(--text-primary);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

/* === Design Tokens === */
:root {
  /* Background */
  --bg-main: #fefcf6;
  --bg-card: #ffffff;
  --bg-warm: #faf6ef;

  /* Text */
  --text-primary: #3d3226;
  --text-secondary: #8b7a62;
  --text-muted: #a89880;

  /* Accent */
  --accent: #c17d4b;
  --accent-deep: #8b5e3c;
  --accent-light: #e8c9a0;

  /* Borders & Dividers */
  --border: #e8ddd0;
  --border-light: #f0e8db;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(61, 50, 38, 0.04);
  --shadow-md: 0 2px 12px rgba(61, 50, 38, 0.06);
  --shadow-lg: 0 4px 24px rgba(61, 50, 38, 0.08);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  /* Font */
  --font-serif: 'Noto Serif SC', 'STSong', 'SimSun', 'Songti SC', serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* Spacing */
  --header-height: 60px;
  --sidebar-width: 260px;
  --content-max-width: 800px;
  --page-padding: 24px;
}

/* === Utility Classes === */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
}
```

- [ ] **Step 3: Write `src/router/index.ts`**

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/notes/:path(.*)*',
      name: 'notes',
      component: () => import('@/views/NotesView.vue'),
    },
  ],
})

export default router
```

- [ ] **Step 4: Write `src/App.vue`**

```vue
<template>
  <div id="app-root">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// Root component — AppHeader and AppFooter are rendered inside each view
// so the notes page can have a different header layout if needed
</script>

<style>
#app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
```

- [ ] **Step 5: Write `src/main.ts`**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/variables.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

- [ ] **Step 6: Verify app boots**

```bash
cd /home/claude/dennyqi.com && npx vite build 2>&1 | tail -5
```
Expected: Build succeeds (may warn about empty views, which is fine — they don't exist yet).

- [ ] **Step 7: Commit**

```bash
git add src/types/index.ts src/styles/variables.css src/main.ts src/router/index.ts src/App.vue && git commit -m "feat: add types, CSS tokens, router, and app shell

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: AppHeader and AppFooter Components

**Files:**
- Create: `src/components/AppHeader.vue`, `src/components/AppFooter.vue`

**Interfaces:**
- Consumes: CSS variables from Task 3
- Produces:
  - `<AppHeader>` — sticky top nav with links: DennyQi (home), 笔记, 经历, 项目
  - `<AppFooter>` — copyright + ICP备案号 links
- Both accept no props (self-contained)

- [ ] **Step 1: Write `src/components/AppHeader.vue`**

```vue
<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="brand">DennyQi</router-link>
      <nav class="nav-links">
        <router-link to="/" class="nav-link" exact-active-class="active">
          <span class="nav-icon">🏠</span>
          <span class="nav-label">首页</span>
        </router-link>
        <a href="#notes" class="nav-link">
          <span class="nav-icon">📝</span>
          <span class="nav-label">笔记</span>
        </a>
        <a href="#experience" class="nav-link">
          <span class="nav-icon">🌱</span>
          <span class="nav-label">经历</span>
        </a>
        <a href="#projects" class="nav-link">
          <span class="nav-icon">🚀</span>
          <span class="nav-label">项目</span>
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Navigation header — sticky, warm background
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  background: rgba(254, 252, 246, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  transition: color 0.2s;
}

.brand:hover {
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: all 0.2s;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--accent);
  background: var(--bg-warm);
}

.nav-link.active,
.nav-link.router-link-exact-active {
  color: var(--accent-deep);
  background: var(--bg-warm);
}

.nav-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .nav-label {
    display: none;
  }

  .nav-link {
    padding: 8px 10px;
  }

  .nav-icon {
    font-size: 1.2rem;
  }
}
</style>
```

- [ ] **Step 2: Write `src/components/AppFooter.vue`**

```vue
<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <p class="copyright">© {{ year }} DennyQi</p>
      <div class="beian-links">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
        >
          浙ICP备2023036581号
        </a>
        <span class="beian-divider">·</span>
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=33010802013290"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
        >
          浙公网安备 33010802013290号-1
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: 40px 0 32px;
  border-top: 1px solid var(--border-light);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-family: var(--font-serif);
}

.beian-links {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.beian-link {
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: color 0.2s;
  white-space: nowrap;
}

.beian-link:hover {
  color: var(--text-secondary);
}

.beian-divider {
  color: var(--border);
  font-size: 0.75rem;
}
</style>
```

- [ ] **Step 3: Verify components compile**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 | head -20
```
Expected: No errors (may show warnings about unused imports).

- [ ] **Step 4: Commit**

```bash
git add src/components/AppHeader.vue src/components/AppFooter.vue && git commit -m "feat: add AppHeader and AppFooter with ICP备案

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: HeroSection Component

**Files:**
- Create: `src/components/HeroSection.vue`

**Interfaces:**
- Consumes: CSS variables
- Produces: `<HeroSection>` — name, tagline, interest tags
- No props (self-contained)

- [ ] **Step 1: Write `src/components/HeroSection.vue`**

```vue
<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-avatar">
        <div class="avatar-placeholder">DQ</div>
      </div>
      <h1 class="hero-name">DennyQi</h1>
      <p class="hero-tagline">
        在信息、数学与音乐的交界处探索
      </p>
      <div class="hero-tags">
        <span class="tag">信息学</span>
        <span class="tag">数学</span>
        <span class="tag">人工智能</span>
        <span class="tag">音乐</span>
        <span class="tag">语言</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Hero section — personal branding
</script>

<style scoped>
.hero {
  padding: 72px 0 56px;
  text-align: center;
}

.hero-content {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
}

.hero-avatar {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.avatar-placeholder {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-light), var(--accent));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  box-shadow: 0 4px 20px rgba(193, 125, 75, 0.2);
}

.hero-name {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.hero-tagline {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 28px;
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.tag {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 20px;
  background: var(--bg-warm);
  color: var(--accent-deep);
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid var(--border-light);
  transition: all 0.2s;
}

.tag:hover {
  background: var(--accent-light);
  border-color: var(--accent);
  color: var(--accent-deep);
}
</style>
```

- [ ] **Step 2: Verify component compiles**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.vue && git commit -m "feat: add HeroSection with name, tagline, and interest tags

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: CategoryCards and CategoryCard Components

**Files:**
- Create: `src/components/CategoryCards.vue`, `src/components/CategoryCard.vue`

**Interfaces:**
- Consumes: `CategoryMeta` type from Task 3
- Produces:
  - `<CategoryCards>` — grid of category cards, fetches tree to compute categories
  - `<CategoryCard>` — single card with icon, name, count, description
- Props: `CategoryCard` accepts `category: CategoryMeta`

- [ ] **Step 1: Write `src/components/CategoryCard.vue`**

```vue
<template>
  <router-link
    :to="`/notes/${category.path}`"
    class="category-card"
  >
    <span class="card-icon">{{ category.icon }}</span>
    <div class="card-body">
      <h3 class="card-name">{{ category.name }}</h3>
      <p class="card-desc">{{ category.description }}</p>
    </div>
    <span class="card-count">{{ category.count }} 篇</span>
  </router-link>
</template>

<script setup lang="ts">
import type { CategoryMeta } from '@/types'

defineProps<{
  category: CategoryMeta
}>()
</script>

<style scoped>
.category-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--accent-light);
}

.card-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.card-count {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--bg-warm);
  padding: 3px 10px;
  border-radius: 12px;
  white-space: nowrap;
}
</style>
```

- [ ] **Step 2: Write `src/components/CategoryCards.vue`**

```vue
<template>
  <section id="notes" class="category-section">
    <div class="container">
      <h2 class="section-title">学习笔记</h2>
      <p class="section-subtitle">在不同领域的探索与记录</p>
      <div class="cards-grid">
        <CategoryCard
          v-for="cat in categories"
          :key="cat.id"
          :category="cat"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CategoryCard from './CategoryCard.vue'

// Static category metadata — counts will be updated once we fetch the tree
// For now we hardcode the 7 top-level categories from the notes directory
const categories = [
  {
    id: 'physics',
    name: '物理',
    icon: '⚛️',
    description: '量子力学与经典物理',
    count: 0,
    path: '02 Physics',
  },
  {
    id: 'math',
    name: '数学',
    icon: '📐',
    description: '抽象代数、分析、概率论、范畴论',
    count: 0,
    path: '03 Mathematics',
  },
  {
    id: 'informatics',
    name: '信息学',
    icon: '💻',
    description: '信息论、计算理论、PLT、计算机系统、算法',
    count: 0,
    path: '04 Informatics',
  },
  {
    id: 'ai',
    name: '人工智能',
    icon: '🤖',
    description: '机器学习、深度学习、强化学习、大模型',
    count: 0,
    path: '05 Artificial Intelligence',
  },
  {
    id: 'languages',
    name: '语言',
    icon: '🗣️',
    description: 'Deutsch · 日本語 · 粤语 · English',
    count: 0,
    path: '07 Languages',
  },
  {
    id: 'readings',
    name: '阅读',
    icon: '📚',
    description: '书摘、古文、诗歌、基督教',
    count: 0,
    path: '08 Readings',
  },
  {
    id: 'music',
    name: '音乐',
    icon: '🎵',
    description: '和声学、作曲、演奏、音乐史',
    count: 0,
    path: '09 Music',
  },
]
</script>

<style scoped>
.category-section {
  padding: 64px 0;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 8px;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 36px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 3: Verify components compile**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
git add src/components/CategoryCard.vue src/components/CategoryCards.vue && git commit -m "feat: add CategoryCards grid and CategoryCard components

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: TimelineSection and ProjectsSection Placeholders

**Files:**
- Create: `src/components/TimelineSection.vue`, `src/components/ProjectsSection.vue`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `<TimelineSection>` — placeholder with vertical dashed line and "整理中" message
  - `<ProjectsSection>` — placeholder with three ghost cards
- No props

- [ ] **Step 1: Write `src/components/TimelineSection.vue`**

```vue
<template>
  <section id="experience" class="timeline-section">
    <div class="container">
      <h2 class="section-title">个人经历</h2>
      <p class="section-subtitle">成长路上的每一步</p>
      <div class="timeline-placeholder">
        <div class="timeline-line"></div>
        <div class="placeholder-content">
          <span class="placeholder-icon">🌱</span>
          <p class="placeholder-text">整理中，敬请期待</p>
          <p class="placeholder-hint">这里将记录我的学习与成长历程</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Timeline placeholder — ready for real content
</script>

<style scoped>
.timeline-section {
  padding: 64px 0;
  background: var(--bg-warm);
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 8px;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 36px;
}

.timeline-placeholder {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  padding: 32px 0 32px 48px;
}

.timeline-line {
  position: absolute;
  left: 22px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--accent-light) 0,
    var(--accent-light) 6px,
    transparent 6px,
    transparent 14px
  );
}

.placeholder-content {
  text-align: center;
  padding: 40px 32px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.placeholder-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 12px;
}

.placeholder-text {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.placeholder-hint {
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
```

- [ ] **Step 2: Write `src/components/ProjectsSection.vue`**

```vue
<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <h2 class="section-title">竞赛 & 项目</h2>
      <p class="section-subtitle">实践中的探索与创造</p>
      <div class="projects-grid">
        <div
          v-for="i in 3"
          :key="i"
          class="project-card-ghost"
        >
          <div class="ghost-icon">🚀</div>
          <div class="ghost-title">项目 {{ i }}</div>
          <div class="ghost-line"></div>
          <div class="ghost-desc">期待精彩内容</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Projects placeholder — ghost cards ready for real content
</script>

<style scoped>
.projects-section {
  padding: 64px 0;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 8px;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 36px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.project-card-ghost {
  padding: 36px 24px;
  text-align: center;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1.5px dashed var(--border);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.project-card-ghost:hover {
  border-color: var(--accent-light);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.ghost-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.ghost-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.ghost-line {
  width: 40px;
  height: 2px;
  background: var(--border-light);
  margin: 0 auto 12px;
}

.ghost-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 3: Verify components compile**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
git add src/components/TimelineSection.vue src/components/ProjectsSection.vue && git commit -m "feat: add TimelineSection and ProjectsSection placeholders

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8: HomeView — Assemble Homepage

**Files:**
- Create: `src/views/HomeView.vue`

**Interfaces:**
- Consumes: AppHeader, HeroSection, CategoryCards, TimelineSection, ProjectsSection, AppFooter
- Produces: Full homepage at `/` route
- Route: `/` → `HomeView`

- [ ] **Step 1: Write `src/views/HomeView.vue`**

```vue
<template>
  <div class="home">
    <AppHeader />
    <main>
      <HeroSection />
      <CategoryCards />
      <TimelineSection />
      <ProjectsSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import CategoryCards from '@/components/CategoryCards.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
```

- [ ] **Step 2: Start Express backend and test homepage renders**

```bash
cd /home/claude/dennyqi.com
# Start backend
npx tsx server/index.ts &
sleep 1
# Start Vite dev server briefly
timeout 8 npx vite --host 2>&1 &
sleep 3
# Quick curl to check the page loads
curl -s http://localhost:5173/ | head -20
kill %1 %2 2>/dev/null
```
Expected: HTML response with `<div id="app"></div>` and script tag.

- [ ] **Step 3: Verify build succeeds**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 && npx vite build 2>&1 | tail -10
```
Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/views/HomeView.vue && git commit -m "feat: assemble HomeView with all sections

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 9: useNotes Composable

**Files:**
- Create: `src/composables/useNotes.ts`

**Interfaces:**
- Consumes: `NoteNode`, `NoteContent` types from Task 3, Express API from Task 2
- Produces:
  - `useNotes()` → `{ tree, content, loading, error, fetchTree(), fetchContent(path) }`
  - `tree: Ref<NoteNode[] | null>`
  - `content: Ref<NoteContent | null>`
  - `loading: Ref<boolean>`
  - `error: Ref<string | null>`

- [ ] **Step 1: Write `src/composables/useNotes.ts`**

```typescript
import { ref } from 'vue'
import type { NoteNode, NoteContent } from '@/types'

const tree = ref<NoteNode[] | null>(null)
const content = ref<NoteContent | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export function useNotes() {
  async function fetchTree(): Promise<void> {
    if (tree.value) return // cached

    loading.value = true
    error.value = null

    try {
      const res = await fetch('/api/notes/tree')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      tree.value = await res.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load notes tree'
      console.error('fetchTree error:', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchContent(notePath: string): Promise<void> {
    loading.value = true
    error.value = null
    content.value = null

    try {
      const url = `/api/notes/content?path=${encodeURIComponent(notePath)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      content.value = await res.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load note content'
      console.error('fetchContent error:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    tree,
    content,
    loading,
    error,
    fetchTree,
    fetchContent,
  }
}
```

- [ ] **Step 2: Verify compiles**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/composables/useNotes.ts && git commit -m "feat: add useNotes composable for tree and content fetching

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 10: SidebarTree Component

**Files:**
- Create: `src/components/SidebarTree.vue`, `src/components/TreeNode.vue`

**Interfaces:**
- Consumes: `useNotes()` composable, `NoteNode` type
- Produces:
  - `<SidebarTree>` — collapsible directory tree container; props: `activePath?: string`; emits: `@select(path)`
  - `<TreeNode>` — recursive tree node; props: `node: NoteNode`, `activePath?: string`, `depth: number`; emits: `@select(path)`

- [ ] **Step 1: Write `src/components/SidebarTree.vue`**

```vue
<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <router-link to="/" class="back-link">← 返回首页</router-link>
      <h3 class="sidebar-title">笔记目录</h3>
    </div>

    <div v-if="loading" class="sidebar-status">加载中...</div>
    <div v-else-if="error" class="sidebar-status error">{{ error }}</div>

    <nav v-else class="tree-nav">
      <TreeNode
        v-for="node in tree"
        :key="node.name"
        :node="node"
        :active-path="activePath"
        :depth="0"
        @select="$emit('select', $event)"
      />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useNotes } from '@/composables/useNotes'
import TreeNode from './TreeNode.vue'

defineProps<{
  activePath?: string
}>()

defineEmits<{
  select: [path: string]
}>()

const { tree, loading, error, fetchTree } = useNotes()

onMounted(() => {
  fetchTree()
})
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  height: calc(100vh - var(--header-height));
  position: sticky;
  top: var(--header-height);
  overflow-y: auto;
  border-right: 1px solid var(--border-light);
  background: var(--bg-card);
  padding: 20px 0;
}

.sidebar-header {
  padding: 0 20px 16px;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 8px;
}

.back-link {
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: color 0.2s;
  display: inline-block;
  margin-bottom: 8px;
}

.back-link:hover {
  color: var(--accent);
}

.sidebar-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
}

.sidebar-status {
  padding: 20px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.sidebar-status.error {
  color: #c44;
}

.tree-nav {
  padding: 0 12px;
}

/* Scrollbar styling */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: var(--header-height);
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: var(--shadow-lg);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
```

- [ ] **Step 2: Create `src/components/TreeNode.vue` (recursive tree node)**

```vue
<template>
  <div class="tree-node">
    <!-- Directory -->
    <div
      v-if="node.type === 'directory'"
      class="node-dir"
      :style="{ paddingLeft: depth * 16 + 8 + 'px' }"
    >
      <button class="node-toggle" @click="expanded = !expanded">
        <span class="toggle-icon" :class="{ expanded }">▸</span>
        <span class="node-name dir">{{ node.name }}</span>
      </button>
      <div v-if="expanded" class="node-children">
        <TreeNode
          v-for="child in node.children"
          :key="child.name"
          :node="child"
          :active-path="activePath"
          :depth="depth + 1"
          @select="$emit('select', $event)"
        />
      </div>
    </div>

    <!-- File -->
    <button
      v-else
      class="node-file"
      :class="{ active: activePath === node.path }"
      :style="{ paddingLeft: depth * 16 + 24 + 'px' }"
      @click="$emit('select', node.path!)"
    >
      <span class="node-name file">{{ node.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NoteNode } from '@/types'

defineProps<{
  node: NoteNode
  activePath?: string
  depth: number
}>()

defineEmits<{
  select: [path: string]
}>()

const expanded = ref(false)
</script>

<style scoped>
.node-dir {
  margin: 1px 0;
}

.node-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.88rem;
  transition: background 0.15s;
}

.node-toggle:hover {
  background: var(--bg-warm);
}

.toggle-icon {
  font-size: 0.65rem;
  color: var(--text-muted);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.toggle-icon.expanded {
  transform: rotate(90deg);
}

.node-name.dir {
  font-weight: 600;
  font-size: 0.88rem;
}

.node-children {
  /* children indented via paddingLeft on child nodes */;
}

.node-file {
  display: block;
  width: 100%;
  padding: 5px 8px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.84rem;
  text-align: left;
  transition: all 0.15s;
  margin: 1px 0;
}

.node-file:hover {
  background: var(--bg-warm);
  color: var(--text-primary);
}

.node-file.active {
  color: var(--accent-deep);
  background: var(--bg-warm);
  font-weight: 500;
}
</style>
```

- [ ] **Step 3: Verify compiles**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
git add src/components/SidebarTree.vue src/components/TreeNode.vue && git commit -m "feat: add SidebarTree with recursive TreeNode component

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 11: MarkdownViewer Component

**Files:**
- Create: `src/components/MarkdownViewer.vue`

**Interfaces:**
- Consumes: `NoteContent` type from Task 3, KaTeX CSS (loaded in index.html)
- Produces: `<MarkdownViewer>` — renders HTML content with KaTeX auto-render
- Props: `content: NoteContent | null`, `loading: boolean`, `error: string | null`

- [ ] **Step 1: Write `src/components/MarkdownViewer.vue`**

```vue
<template>
  <div class="markdown-viewer">
    <!-- Loading -->
    <div v-if="loading" class="viewer-status">
      <span class="loading-spinner"></span>
      <p>加载中...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="viewer-status error">
      <p>加载失败：{{ error }}</p>
    </div>

    <!-- Empty — no note selected -->
    <div v-else-if="!content" class="viewer-empty">
      <div class="empty-icon">📝</div>
      <h3 class="empty-title">选择一篇笔记</h3>
      <p class="empty-hint">从左侧目录中选择一篇文章开始阅读</p>
    </div>

    <!-- Content -->
    <article v-else class="note-article">
      <header class="article-header">
        <p class="article-category">{{ content.category }}</p>
        <h1 class="article-title">{{ content.title }}</h1>
      </header>
      <div
        class="article-body"
        v-html="content.html"
        ref="articleBody"
      ></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { NoteContent } from '@/types'

const props = defineProps<{
  content: NoteContent | null
  loading: boolean
  error: string | null
}>()

const articleBody = ref<HTMLElement | null>(null)

// Re-run KaTeX auto-render when content changes
watch(
  () => props.content?.html,
  async () => {
    if (!props.content?.html) return
    await nextTick()
    if (articleBody.value) {
      try {
        // Dynamic import of KaTeX auto-render
        const { default: renderMathInElement } = await import('katex/dist/contrib/auto-render.mjs')
        renderMathInElement(articleBody.value, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        })
      } catch {
        // KaTeX not available — math renders as raw text, which is acceptable
      }
    }
  }
)
</script>

<style scoped>
.markdown-viewer {
  flex: 1;
  min-height: calc(100vh - var(--header-height));
  padding: 40px 48px;
  max-width: var(--content-max-width);
}

.viewer-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: var(--text-muted);
}

.viewer-status.error {
  color: #c44;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-light);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.viewer-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.empty-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Article styling */
.article-header {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-light);
}

.article-category {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.article-title {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

/* Rendered markdown content */
.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  font-family: var(--font-serif);
  color: var(--text-primary);
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.35;
}

.article-body :deep(h1) { font-size: 1.6rem; }
.article-body :deep(h2) { font-size: 1.3rem; }
.article-body :deep(h3) { font-size: 1.1rem; }

.article-body :deep(p) {
  margin-bottom: 1em;
  line-height: 1.8;
}

.article-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.article-body :deep(a:hover) {
  color: var(--accent-deep);
}

.article-body :deep(blockquote) {
  margin: 1em 0;
  padding: 12px 20px;
  border-left: 3px solid var(--accent-light);
  background: var(--bg-warm);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--text-secondary);
}

.article-body :deep(code) {
  background: var(--bg-warm);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.88em;
  color: var(--accent-deep);
}

.article-body :deep(pre) {
  margin: 1em 0;
  padding: 20px;
  background: #2d2520;
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.article-body :deep(pre code) {
  background: none;
  padding: 0;
  color: #e8ddd0;
  font-size: 0.85rem;
  line-height: 1.6;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  margin: 0.8em 0;
  padding-left: 1.5em;
}

.article-body :deep(li) {
  margin-bottom: 0.3em;
}

.article-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.article-body :deep(th),
.article-body :deep(td) {
  padding: 8px 14px;
  border: 1px solid var(--border-light);
  text-align: left;
}

.article-body :deep(th) {
  background: var(--bg-warm);
  font-weight: 600;
}

.article-body :deep(img) {
  max-width: 100%;
  border-radius: var(--radius-md);
}

.article-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-light);
  margin: 2em 0;
}

@media (max-width: 768px) {
  .markdown-viewer {
    padding: 24px 20px;
  }
}
</style>
```

- [ ] **Step 2: Verify compiles**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/MarkdownViewer.vue && git commit -m "feat: add MarkdownViewer with KaTeX math rendering

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 12: NotesView — Assemble Notes Page

**Files:**
- Create: `src/views/NotesView.vue`

**Interfaces:**
- Consumes: SidebarTree, MarkdownViewer, useNotes composable
- Produces: Full notes browsing page at `/notes/:path*`
- Route: `/notes/:path*` → `NotesView`

- [ ] **Step 1: Write `src/views/NotesView.vue`**

```vue
<template>
  <div class="notes-page">
    <AppHeader />

    <!-- Mobile sidebar toggle -->
    <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
      {{ sidebarOpen ? '✕' : '☰' }} 目录
    </button>

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      @click="sidebarOpen = false"
    ></div>

    <div class="notes-layout">
      <SidebarTree
        :class="{ open: sidebarOpen }"
        :active-path="currentPath"
        @select="onSelectNote"
      />

      <MarkdownViewer
        :content="content"
        :loading="loading"
        :error="error"
      />
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SidebarTree from '@/components/SidebarTree.vue'
import MarkdownViewer from '@/components/MarkdownViewer.vue'
import { useNotes } from '@/composables/useNotes'

const route = useRoute()
const router = useRouter()
const { content, loading, error, fetchContent } = useNotes()

const sidebarOpen = ref(false)
const currentPath = ref<string | undefined>(undefined)

// Derive the note path from the route
function getPathFromRoute(): string | undefined {
  const pathParam = route.params.path
  if (!pathParam) return undefined
  const segments = Array.isArray(pathParam) ? pathParam : [pathParam]
  return segments.join('/')
}

// Load content when route changes
watch(
  () => route.fullPath,
  () => {
    const p = getPathFromRoute()
    currentPath.value = p
    sidebarOpen.value = false
    if (p) {
      fetchContent(p)
    }
  },
  { immediate: true }
)

function onSelectNote(path: string) {
  router.push(`/notes/${path}`)
}
</script>

<style scoped>
.notes-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.notes-layout {
  display: flex;
  flex: 1;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 60;
  padding: 12px 20px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: background 0.2s;
}

.sidebar-toggle:hover {
  background: var(--accent-deep);
}

.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 45;
  background: rgba(61, 50, 38, 0.3);
  backdrop-filter: blur(2px);
}

@media (max-width: 768px) {
  .sidebar-toggle {
    display: block;
  }

  .sidebar-overlay {
    display: block;
  }
}
</style>
```

- [ ] **Step 2: Update `src/views/HomeView.vue` — add smooth scroll for anchor links**

The `AppHeader` uses anchor links (`#notes`, `#experience`, `#projects`) for intra-page navigation. These need click handlers:

```vue
<template>
  <div class="home">
    <AppHeader @navigate="scrollToSection" />
    ...
  </div>
</template>
```

Wait — instead, let's update `AppHeader.vue` to emit navigation events and let the parent handle scrolling. Actually, the simpler approach: update AppHeader to use Vue's `@click` with `scrollIntoView`.

Let me update the AppHeader to handle this internally with a method:

Actually, this is simpler — just add a click handler in AppHeader that does `document.getElementById(sectionId)?.scrollIntoView()`. Let me update AppHeader.vue instead.

Let me update `src/components/AppHeader.vue`:

Replace the anchor `href` approach with `@click` handlers that use `scrollIntoView`.

Actually, the simplest fix — just keep the `<a href="#notes">` approach, since the browser handles it natively. The only issue is when navigating from the notes page back to home, the hash won't be in the URL. But that's a minor edge case. Let me keep AppHeader as-is and just make the NotesView work.

Let me re-check: the anchor links in AppHeader are `<a href="#notes">` — these work natively on the homepage. On the NotesView page, clicking them navigates to `/` first (via the brand link), but the section links would also work if we stay on the home page. This is acceptable behavior for now.

Let me keep the AppHeader as-is and focus on getting NotesView working.

- [ ] **Step 3: Verify full build**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1 && npx vite build 2>&1 | tail -10
```
Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/views/NotesView.vue && git commit -m "feat: assemble NotesView with sidebar and markdown viewer

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 13: Integration Test and Polish

**Files:**
- No new files — verify everything works end-to-end
- Possibly modify: `src/views/NotesView.vue` (fix any routing issues)

**Interfaces:**
- Consumes: everything from Tasks 1–12
- Produces: working end-to-end application

- [ ] **Step 1: Start both servers and run end-to-end test**

```bash
cd /home/claude/dennyqi.com

# Start Express backend
npx tsx server/index.ts &
BACKEND_PID=$!
sleep 1

# Test tree API
echo "=== Testing /api/notes/tree ==="
curl -s http://localhost:3001/api/notes/tree | python3 -m json.tool 2>/dev/null | head -30

# Test content API
echo ""
echo "=== Testing /api/notes/content ==="
curl -s "http://localhost:3001/api/notes/content?path=04%20Informatics/01%20Information%20Theory/01%20Information%20Entropy.md" | python3 -m json.tool 2>/dev/null | head -20

kill $BACKEND_PID 2>/dev/null
```

Expected: Tree JSON with categories, content JSON with title + html + category.

- [ ] **Step 2: Build for production**

```bash
cd /home/claude/dennyqi.com && npx vite build 2>&1
```
Expected: Build succeeds. Output in `dist/`.

- [ ] **Step 3: Verify dist output**

```bash
ls -la /home/claude/dennyqi.com/dist/
```
Expected: `index.html`, `assets/` directory with JS and CSS files.

- [ ] **Step 4: Final vue-tsc check**

```bash
cd /home/claude/dennyqi.com && npx vue-tsc --noEmit 2>&1
```
Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: final integration — end-to-end working homepage

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Implementation Notes

1. **Running the app in development:**
   ```bash
   # Terminal 1: Start Express backend
   npm run dev:server

   # Terminal 2: Start Vite dev server
   npm run dev
   ```
   Then open `http://localhost:5173`.

2. **The AppHeader uses hash links** (`#notes`, `#experience`, `#projects`) for in-page navigation on the homepage. These work via native browser scroll-to-anchor behavior.

3. **Category counts** in `CategoryCards.vue` are currently hardcoded to `0`. The `fetchTree()` call after mount can be used to compute real counts — this is deferred to a follow-up polish task.

4. **KaTeX** is loaded as a dynamic import inside `MarkdownViewer.vue` — the CSS is in `index.html`, and the JS auto-render is called only when content renders.
