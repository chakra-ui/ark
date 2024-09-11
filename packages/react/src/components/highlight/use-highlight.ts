import { type HighlightChunk, type HighlightWordProps, highlightWord } from '@zag-js/highlight-word'
import { useMemo } from 'react'

export interface UseHighlightProps extends HighlightWordProps {}

export const useHighlight = (props: UseHighlightProps): HighlightChunk[] => {
  return useMemo(() => highlightWord(props), [props])
}
