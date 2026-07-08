export interface NoteNode {
  name: string
  type: 'directory' | 'file'
  path?: string
  children?: NoteNode[]
  isProtected?: boolean
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
