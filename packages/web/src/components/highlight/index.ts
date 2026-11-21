import { HighlightElement } from './root.js'

export { HighlightElement }
export type { HighlightChunk, HighlightWordProps as HighlightProps } from '@zag-js/highlight-word'

declare global {
  interface HTMLElementTagNameMap {
    'ark-highlight': HighlightElement
  }
}
