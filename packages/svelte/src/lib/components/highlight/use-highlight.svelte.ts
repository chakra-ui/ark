import type { Accessor } from '$lib/types'
import { runIfFn } from '$lib/utils/run-if-fn'
import { type HighlightChunk, type HighlightWordProps, highlightWord } from '@zag-js/highlight-word'
import type { MaybeFunction } from '@zag-js/utils'

export interface UseHighlightProps extends HighlightWordProps {}
export interface UseHighlightReturn extends Accessor<HighlightChunk[]> {}

export const useHighlight = (props: MaybeFunction<UseHighlightProps>): UseHighlightReturn => {
  const chunks = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return highlightWord(resolvedProps)
  })
  return () => chunks
}

export type { HighlightChunk }
