import { ref } from 'vue'
import type { NoteNode, NoteContent } from '@/types'

const tree = ref<NoteNode[] | null>(null)
const content = ref<NoteContent | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export function useNotes() {
  async function fetchTree(): Promise<void> {
    if (tree.value) return

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
