import { highlightWord } from '@zag-js/highlight-word'
import { type MaybeRef, computed, toValue } from 'vue'
import { cleanProps } from '../../utils/clean-props'
import type { HighlightChunk, UseHighlightProps } from './highlight.types'

export const useHighlight = (props: MaybeRef<UseHighlightProps>) => {
  return computed(() => highlightWord(cleanProps(toValue(props))))
}

export type { HighlightChunk, UseHighlightProps }
