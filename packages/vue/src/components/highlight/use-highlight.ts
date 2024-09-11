import { highlightWord } from '@zag-js/highlight-word'
import { computed } from 'vue'
import { cleanProps } from '../../utils'
import type { HighlightChunk, UseHighlightProps } from './highlight.types'

export const useHighlight = (props: UseHighlightProps) => {
  return computed(() => highlightWord(cleanProps(props)))
}

export type { HighlightChunk, UseHighlightProps }
