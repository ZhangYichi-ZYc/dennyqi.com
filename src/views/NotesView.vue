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
        :loading="contentLoading"
        :error="displayError"
      />
    </div>

    <AppFooter />

    <!-- Password dialog -->
    <PasswordDialog
      v-if="showPasswordDialog"
      @authenticated="onAuthenticated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SidebarTree from '@/components/SidebarTree.vue'
import MarkdownViewer from '@/components/MarkdownViewer.vue'
import PasswordDialog from '@/components/PasswordDialog.vue'
import { useNotes } from '@/composables/useNotes'

const route = useRoute()
const router = useRouter()
const { content, contentLoading, contentError, fetchContent, setToken } = useNotes()

const sidebarOpen = ref(false)
const currentPath = ref<string | undefined>(undefined)
const showPasswordDialog = ref(false)
const pendingPath = ref<string>('')

// Hide auth error from MarkdownViewer (show dialog instead)
const displayError = computed(() => {
  if (contentError.value === 'auth_required') return null
  return contentError.value
})

// Derive the note path from the route
function getPathFromRoute(): string | undefined {
  const pathParam = route.params.path
  if (!pathParam) return undefined
  const segments = Array.isArray(pathParam) ? pathParam : [pathParam]
  return segments.join('/')
}

// Load content when route changes — only if path points to a .md file
watch(
  () => route.fullPath,
  async () => {
    const p = getPathFromRoute()
    currentPath.value = p
    sidebarOpen.value = false
    if (p && p.endsWith('.md')) {
      await loadWithAuth(p)
    }
  },
  { immediate: true }
)

async function loadWithAuth(path: string) {
  const status = await fetchContent(path)
  if (status === 401) {
    pendingPath.value = path
    showPasswordDialog.value = true
  }
}

async function onAuthenticated(token: string) {
  setToken(token)
  showPasswordDialog.value = false
  if (pendingPath.value) {
    await fetchContent(pendingPath.value)
    pendingPath.value = ''
  }
}

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
