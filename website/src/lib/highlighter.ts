import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null
let highlighterPromise: Promise<Highlighter> | null = null

export async function getHighlighter(): Promise<Highlighter> {
  // If we already have a highlighter instance, return it
  if (highlighter) {
    return highlighter
  }

  // If we're already in the process of creating a highlighter, return that promise
  if (highlighterPromise) {
    return highlighterPromise
  }

  // Create a new highlighter and cache the promise to prevent concurrent creation
  highlighterPromise = createHighlighter({
    themes: ['github-dark-default'],
    langs: ['tsx', 'vue', 'bash', 'javascript', 'typescript', 'json', 'svelte'],
  })
    .then((hl) => {
      highlighter = hl
      highlighterPromise = null // Clear the promise once resolved
      return hl
    })
    .catch((error) => {
      highlighterPromise = null // Clear the promise on error so we can retry
      throw error
    })

  return highlighterPromise
}

export function disposeHighlighter() {
  if (highlighter) {
    highlighter.dispose()
    highlighter = null
  }
  highlighterPromise = null
}
