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
      ></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { NoteContent } from '@/types'

defineProps<{
  content: NoteContent | null
  loading: boolean
  error: string | null
}>()
</script>

<style scoped>
.markdown-viewer {
  flex: 1;
  min-height: calc(100vh - var(--header-height));
  padding: 40px 48px;
  max-width: 960px;
  margin: 0 auto;
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
