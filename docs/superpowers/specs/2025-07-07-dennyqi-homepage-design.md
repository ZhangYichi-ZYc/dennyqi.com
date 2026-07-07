# DennyQi 个人主页 — 设计规格说明

**日期：** 2025-07-07  
**状态：** 已确认

---

## 1. 概述

为 DennyQi 构建一个 Vue 3 纯前端个人主页，温暖人文风格，兼顾对外展示（个人经历、竞赛项目）与个人使用（浏览 ~421 篇 Markdown 学习笔记）。

---

## 2. 技术架构

| 层     | 技术                      | 职责                             |
| ------ | ------------------------- | -------------------------------- |
| 前端   | Vue 3 + Vite + TypeScript | 页面渲染、路由、markdown 展示    |
| 后端   | Express                   | 读取 notes 目录，提供文件树 + 内容 API |
| 样式   | frontend-design skill     | 生成组件 UI，温暖人文风格        |
| Markdown | markdown-it + highlight.js + KaTeX | 渲染正文、代码高亮、数学公式 |

### 为什么不选其他方案
- **Nuxt 3：** notes 内容不参与 SSR，引入 Nuxt 增加框架复杂度，收益不大
- **纯 Vite 构建时注入：** 每次更新笔记需重新构建部署，不符合"动态同步"需求
- **Pinia/Vuex：** 单页数据量小，composables + provide/inject 足够

### 依赖包
- `vue@3`, `vue-router@4`
- `express`, `cors`
- `markdown-it`, `highlight.js`, `katex`
- `@types/express`, `@types/node`
- `vite`, `@vitejs/plugin-vue`, `typescript`

---

## 3. 视觉设计

### 配色方案（温暖人文风）

| 用途     | 色值       |
| -------- | ---------- |
| 主背景   | `#fefcf6`  |
| 卡片背景 | `#ffffff`  |
| 正文     | `#3d3226`  |
| 辅助文字 | `#8b7a62`  |
| 强调色   | `#c17d4b`  |
| 强调色深 | `#8b5e3c`  |
| 边框     | `#e8ddd0`  |

### 字体
- 标题：`Noto Serif SC`（思源宋体，有温度的衬线体）
- 正文：系统默认无衬线字体栈
- 代码：`JetBrains Mono` / `Fira Code`

### 圆角 & 阴影
- 卡片圆角：`12px`
- 按钮圆角：`8px`
- 阴影：微弱暖色阴影 `0 2px 12px rgba(61, 50, 38, 0.06)`

---

## 4. 页面结构 & 路由

| 路由               | 页面      | 说明                        |
| ------------------ | --------- | --------------------------- |
| `/`                | 首页      | Hero + 分类卡片 + 占位区 + Footer |
| `/notes`           | 笔记浏览  | 无具体文章时展示欢迎提示    |
| `/notes/:path*`    | 笔记浏览  | 路径参数映射到 notes 目录路径 |

### 首页布局

```
┌──────────────────────────────────────────────┐
│  AppHeader  (DennyQi / 笔记 / 经历 / 项目)      │
├──────────────────────────────────────────────┤
│  HeroSection                                 │
│    头像 + 姓名 DennyQi                        │
│    一句话简介                                 │
│    标签: 信息学 · 数学 · 音乐 · 语言           │
├──────────────────────────────────────────────┤
│  CategoryCards (masonry grid)                │
│    [数学] [信息学] [AI] [物理]               │
│    [语言] [音乐] [阅读]                      │
│    每卡片: 图标 + 名称 + 篇数 + 简要描述       │
├──────────────────────────────────────────────┤
│  TimelineSection (占位)                       │
│    纵向虚线 + "整理中，敬请期待"              │
├──────────────────────────────────────────────┤
│  ProjectsSection (占位)                       │
│    三个虚位卡片                              │
├──────────────────────────────────────────────┤
│  AppFooter                                   │
│    © DennyQi                                 │
│    浙ICP备2023036581号 · 浙公网安备...        │
└──────────────────────────────────────────────┘
```

### 笔记浏览页布局

```
┌──────────────────────────────────────────────────┐
│ ← 返回首页   面包屑导航                           │
├────────────┬─────────────────────────────────────┤
│ 目录树     │  正文区域 (MarkdownViewer)          │
│ (可折叠)   │                                     │
│            │  - markdown-it 渲染                  │
│ ▼ 信息论   │  - KaTeX 数学公式                   │
│   信息熵    │  - highlight.js 代码着色            │
│   AEP      │                                     │
│ ▸ 计算理论 │                                     │
│ ▸ PLT      │                                     │
├────────────┴─────────────────────────────────────┤
│  上一篇 ← → 下一篇                                │
└──────────────────────────────────────────────────┘
```

---

## 5. 组件树

```
App.vue
├── AppHeader.vue          — 顶部导航（粘性定位）
├── <router-view>
│   ├── HomeView.vue
│   │   ├── HeroSection.vue
│   │   ├── CategoryCards.vue
│   │   │   └── CategoryCard.vue × N
│   │   ├── TimelineSection.vue
│   │   ├── ProjectsSection.vue
│   │   └── AppFooter.vue
│   │
│   └── NotesView.vue
│       ├── SidebarTree.vue    — 目录树（可折叠）
│       ├── MarkdownViewer.vue — markdown 渲染器
│       └── AppFooter.vue
```

---

## 6. API 设计

### `GET /api/notes/tree`

返回完整目录树 JSON。

```json
{
  "name": "notes",
  "type": "directory",
  "children": [
    {
      "name": "03 Mathematics",
      "type": "directory",
      "children": [
        {
          "name": "Linear Algebra",
          "type": "directory",
          "children": [
            {
              "name": "Vector Spaces.md",
              "type": "file",
              "path": "03 Mathematics/Linear Algebra/Vector Spaces.md"
            }
          ]
        }
      ]
    }
  ]
}
```

- 排除 `tmp/`、`old/` 等非笔记目录
- 文件名去掉数字前缀（`01 Information Entropy.md` → `Information Entropy`）

### `GET /api/notes/content?path=<相对路径>`

返回渲染好的 HTML + frontmatter 元数据。

```json
{
  "title": "Information Entropy",
  "path": "04 Informatics/01 Information Theory/01 Information Entropy.md",
  "html": "<h2>定义</h2><p>...</p>",
  "category": "04 Informatics / 01 Information Theory"
}
```

- 服务端用 markdown-it 渲染为 HTML
- KaTeX 公式包裹在 `$$` 或 `$` 中，前端用 KaTeX auto-render 处理

---

## 7. 响应式策略

| 断点    | 首页                   | 笔记页                     |
| ------- | ---------------------- | -------------------------- |
| ≥ 768px | 卡片 grid 3-4 列       | 侧边栏 260px + 正文       |
| < 768px | 卡片 grid 单列         | 侧边栏收为抽屉，按钮呼出   |

---

## 8. 备案号处理

Footer 中使用小字号（`0.75rem`）、低对比度（`#a89880`）展示备案号链接：
- 浙ICP备2023036581号 → `https://beian.miit.gov.cn/`
- 浙公网安备 33010802013290号-1 → `https://beian.mps.gov.cn/#/query/webSearch?code=33010802013290`

Hover 时颜色过渡到 `#8b7a62`，与其他文字一致。不添加额外背景或边框，自然融入页面底部。

---

## 9. 项目结构

```
dennyqi.com/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── server/
│   └── index.ts              # Express 服务入口
├── notes/                    # 已有，不动
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/
│   │   └── index.ts
│   ├── views/
│   │   ├── HomeView.vue
│   │   └── NotesView.vue
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── HeroSection.vue
│   │   ├── CategoryCards.vue
│   │   ├── CategoryCard.vue
│   │   ├── TimelineSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── AppFooter.vue
│   │   ├── SidebarTree.vue
│   │   └── MarkdownViewer.vue
│   ├── composables/
│   │   └── useNotes.ts
│   ├── styles/
│   │   └── variables.css
│   └── types/
│       └── index.ts
└── docs/
    └── superpowers/
        └── specs/
            └── 2025-07-07-dennyqi-homepage-design.md
```

---

## 10. 后续扩展点

- 个人经历和竞赛项目从占位状态填充真实内容时，只需修改对应 Vue 组件的模板即可
- 如需搜索笔记，可在 Express 后端添加 `GET /api/notes/search?q=...`
- 如需深色模式，CSS 变量切换即可（本阶段不做）
