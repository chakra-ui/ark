import { type HighlightChunk, type HighlightWordProps, highlightWord } from '@zag-js/highlight-word'
import type { Accessor } from 'solid-js'
import { createMemo } from 'solid-js'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'

export interface UseHighlightProps extends HighlightWordProps {}

export const useHighlight = (props: MaybeAccessor<UseHighlightProps>): Accessor<HighlightChunk[]> => {
  return createMemo(() => highlightWord(runIfFn(props)))
}

export type { HighlightChunk }
