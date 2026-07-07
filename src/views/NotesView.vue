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
import { ref, watch } from 'vue'
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
