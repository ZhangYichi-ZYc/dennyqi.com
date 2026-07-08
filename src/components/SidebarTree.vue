<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <router-link to="/" class="back-link">&larr; 返回首页</router-link>
      <h3 class="sidebar-title">笔记目录</h3>
    </div>

    <div v-if="treeLoading" class="sidebar-status">加载中...</div>
    <div v-else-if="treeError" class="sidebar-status error">{{ treeError }}</div>

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
import { onMounted } from 'vue'
import { useNotes } from '@/composables/useNotes'
import TreeNode from './TreeNode.vue'

defineProps<{
  activePath?: string
}>()

defineEmits<{
  select: [path: string]
}>()

const { tree, treeLoading, treeError, fetchTree } = useNotes()

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
