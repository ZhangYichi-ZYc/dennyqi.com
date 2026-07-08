# DennyQi

基于 Vue 3 + Express 的个人主页，温暖人文风格。展示学习笔记、个人经历与竞赛项目。

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | Vue 3 + Vite + TypeScript + Vue Router 4 |
| 后端 | Express（轻量，读取 notes 目录） |
| 内容渲染 | markdown-it + highlight.js + KaTeX |

## 功能

- **首页**：Hero 区域、分类卡片、个人经历（占位）、竞赛项目（占位）
- **笔记浏览**：侧边栏目录树 + Markdown 正文（数学公式 + 代码高亮）
- **API**：`/api/notes/tree`、`/api/notes/content`
- **响应式**：移动端适配

## 开发

```bash
# 安装依赖
npm install

# 终端 1：启动后端（端口 42210）
npm run dev:server

# 终端 2：启动前端（端口 42211）
npm run dev
```

访问 http://localhost:42211

## 生产构建

```bash
npm run build   # 输出到 dist/
```

## 项目结构

```
├── server/index.ts           # Express 后端
├── src/
│   ├── views/
│   │   ├── HomeView.vue      # 首页
│   │   └── NotesView.vue     # 笔记页
│   ├── components/           # UI 组件
│   ├── composables/          # 数据获取逻辑
│   ├── styles/variables.css  # 设计令牌
│   └── types/                # TypeScript 类型
└── notes/                    # Markdown 笔记（内容源）
```

## 许可证

MIT
