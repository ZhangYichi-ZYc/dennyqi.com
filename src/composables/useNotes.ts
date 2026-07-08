import { ref } from 'vue'
import type { NoteNode, NoteContent } from '@/types'

const tree = ref<NoteNode[] | null>(null)
const treeLoading = ref(false)
const treeError = ref<string | null>(null)

const content = ref<NoteContent | null>(null)
const contentLoading = ref(false)
const contentError = ref<string | null>(null)

let authToken: string | null = sessionStorage.getItem('auth_token')

export function useNotes() {
  function getToken(): string | null {
    return authToken
  }

  function setToken(token: string) {
    authToken = token
    sessionStorage.setItem('auth_token', token)
  }

  async function fetchTree(): Promise<void> {
    if (tree.value) return

    treeLoading.value = true
    treeError.value = null

    try {
      const res = await fetch('/api/notes/tree')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      tree.value = await res.json()
    } catch (e) {
      treeError.value = e instanceof Error ? e.message : 'Failed to load notes tree'
      console.error('fetchTree error:', e)
    } finally {
      treeLoading.value = false
    }
  }

  async function fetchContent(notePath: string): Promise<number> {
    contentLoading.value = true
    contentError.value = null
    content.value = null

    try {
      const url = `/api/notes/content?path=${encodeURIComponent(notePath)}`
      const headers: Record<string, string> = {}
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
      }
      const res = await fetch(url, { headers })
      if (res.status === 401) {
        contentError.value = 'auth_required'
        return 401
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      content.value = await res.json()
      return 200
    } catch (e) {
      contentError.value = e instanceof Error ? e.message : 'Failed to load note content'
      console.error('fetchContent error:', e)
      return 0
    } finally {
      contentLoading.value = false
    }
  }

  return {
    tree,
    treeLoading,
    treeError,
    fetchTree,
    content,
    contentLoading,
    contentError,
    fetchContent,
    getToken,
    setToken,
  }
}
