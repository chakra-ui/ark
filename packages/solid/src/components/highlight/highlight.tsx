import type { ComponentProps } from 'solid-js'
import { For, Show } from 'solid-js'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { ark } from '../factory.tsx'
import { type UseHighlightProps, useHighlight } from './use-highlight.ts'

export interface HighlightBaseProps extends UseHighlightProps {}

export interface HighlightProps extends Assign<ComponentProps<'mark'>, HighlightBaseProps> {}

export const Highlight = (props: HighlightProps) => {
  if (typeof props.text !== 'string') {
    throw new Error('[ark-ui/highlight] text must be a string')
  }

  const [highlightProps, localProps] = createSplitProps<HighlightBaseProps>()(props, [
    'query',
    'text',
    'ignoreCase',
    'matchAll',
    'exactMatch',
  ])

  const chunks = useHighlight(highlightProps)

  return (
    <For each={chunks()}>
      {(chunk) => (
        <Show when={chunk.match} fallback={chunk.text}>
          <ark.mark {...localProps}>{chunk.text}</ark.mark>
        </Show>
      )}
    </For>
  )
}
