import { createHighlighter, type Highlighter } from 'shiki'

const cache = new Map<string, Promise<unknown>>()

function cachePromise<T>(key: string, setPromise: () => Promise<T>): Promise<T> {
  const cached = cache.get(key)
  if (cached) return cached as Promise<T>

  const promise = setPromise()
  cache.set(key, promise)
  return promise
}

export async function getHighlighter(): Promise<Highlighter> {
  return cachePromise('highlighter', () =>
    createHighlighter({
      themes: ['github-dark-default'],
      langs: ['tsx', 'vue', 'bash', 'javascript', 'typescript', 'json', 'svelte'],
    }),
  )
}

export function disposeHighlighter() {
  cache.clear()
}
