import { type HighlightChunk, type HighlightWordProps, highlightWord } from '@zag-js/highlight-word'
import type { Accessor } from 'solid-js'
import { createMemo } from 'solid-js'

export interface UseHighlightProps extends HighlightWordProps {}

export const useHighlight = (props: UseHighlightProps): Accessor<HighlightChunk[]> => {
  return createMemo(() => highlightWord(props))
}
