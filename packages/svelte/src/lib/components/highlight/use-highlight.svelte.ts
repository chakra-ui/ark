import { type HighlightChunk, type HighlightWordProps, highlightWord } from '@zag-js/highlight-word'

export interface UseHighlightProps extends HighlightWordProps {}

export const useHighlight = (props: UseHighlightProps): HighlightChunk[] => {
  const chunks = $derived(highlightWord(props))
  return chunks
}

export type { HighlightChunk }
