# NextChat Markdown 解析与渲染模块

此文件夹包含了从 NextChat 项目中提取的 Markdown 解析与渲染相关代码。

## 文件说明

### 核心渲染文件

| 文件 | 说明 |
|------|------|
| `components/markdown.tsx` | **主渲染组件** — 基于 `react-markdown`，集成 Math（KaTeX）、GFM、Mermaid 图表、HTML 预览、代码高亮、代码折叠 |
| `styles/markdown.scss` | GitHub Flavored Markdown 样式 — 完整的 dark/light 主题变量，标题、表格、代码块、脚注、任务列表等 |
| `styles/highlight.scss` | Tokyo Night Dark 代码语法高亮主题 — 覆盖 highlight.js 的 `.hljs-*` 类 |

### 直接依赖组件

| 文件 | 说明 |
|------|------|
| `components/artifacts.tsx` | HTML 预览 & Artifacts 分享 — `HTMLPreview`、`ArtifactsShareButton`、导出按钮 |
| `components/artifacts.module.scss` | Artifacts 样式 |
| `components/ui-lib.tsx` | UI 工具组件 — `showImageModal`（全屏图片/HTML 弹窗）、`FullScreen`、`Modal`、`showToast` |
| `components/ui-lib.module.scss` | UI 库样式 |
| `components/button.tsx` | `IconButton` 组件 |
| `components/button.module.scss` | 按钮样式 |
| `components/chat.tsx` | 聊天组件 — 调用 `<Markdown>` 渲染消息内容 |
| `components/home.tsx` | 首页/路由组件 — `<Loading>` 被 artifacts 引用 |

### SVG 图标

| 文件 | 用途 |
|------|------|
| `icons/three-dots.svg` | LoadingIcon（加载中指示器） |
| `icons/reload.svg` | ReloadButtonIcon（重新加载按钮） |
| `icons/close.svg` | CloseIcon（关闭按钮） |
| `icons/eye.svg` | EyeIcon（预览按钮） |
| `icons/share.svg` | ExportIcon（导出/分享按钮） |
| `icons/copy.svg` | CopyIcon（复制按钮） |
| `icons/download.svg` | DownloadIcon（下载按钮） |
| `icons/github.svg` | GithubIcon（GitHub 链接） |
| `icons/loading.svg` | LoadingButtonIcon（加载中动画） |

### 工具函数

| 文件 | 说明 |
|------|------|
| `utils.ts` | `copyToClipboard`、`useWindowSize`、`downloadAs`、`isMobileScreen` 等 |
| `utils/format.ts` | `prettyObject` 等格式化函数 |
| `utils/hooks.ts` | React hooks（`useMobileScreen` 等） |
| `utils/clone.ts` | `ensure` 深拷贝工具 |
| `utils/chat.ts` | 聊天预处理（`preProcessImageContent`、`streamWithThink` 等） |

## 核心技术栈（npm 依赖）

```
react-markdown     — Markdown → React 的核心转换
remark-math        — Markdown 数学公式解析（$...$ 和 $$...$$）
remark-gfm         — GitHub Flavored Markdown（表格、删除线、任务列表）
remark-breaks      — 单换行转为 <br>
rehype-katex       — 将 math AST 渲染为 KaTeX HTML
rehype-highlight   — 代码块语法高亮（highlight.js）
mermaid            — Mermaid 图表渲染
katex              — KaTeX CSS 数学排版
use-debounce       — debounce hook（用于延迟 artifacts 渲染）
clsx               — CSS class 合并工具
```

## 渲染流程

```
MarkdownContent (markdown.tsx)
  │
  ├─ escapeBrackets() → 转义行内/块级 LaTeX 定界符
  ├─ tryWrapHtmlCode() → 自动包裹裸 HTML 代码块
  │
  └─ ReactMarkdown
       ├─ remarkPlugins: [RemarkMath, RemarkGfm, RemarkBreaks]
       ├─ rehypePlugins: [RehypeKatex, RehypeHighlight]
       └─ components (自定义渲染器):
            ├─ pre → PreCode (提取 mermaid/html 代码)
            │         ├─ <Mermaid> (mermaid.run)
            │         └─ <HTMLPreview> (artifact iframe)
            ├─ code → CustomCode (代码折叠 >400px)
            ├─ p → <p dir="auto">
            └─ a → 智能链接 (音频/视频嵌入, 内部链接)
```
