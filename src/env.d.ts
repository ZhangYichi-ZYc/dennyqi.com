/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'katex/dist/contrib/auto-render.mjs' {
  import katex from 'katex'
  export default function renderMathInElement(
    element: HTMLElement,
    options?: {
      delimiters?: Array<{ left: string; right: string; display: boolean }>
      throwOnError?: boolean
    }
  ): void
}
