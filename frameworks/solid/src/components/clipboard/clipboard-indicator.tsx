import { mergeProps } from '@zag-js/solid'
import { type JSX, Show, children } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

interface IndicatorProps {
  copied?: JSX.Element
}

export interface ClipboardIndicatorProps extends Assign<HTMLArkProps<'div'>, IndicatorProps> {}

export const ClipboardIndicator = (props: ClipboardIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, ['copied'])
  const api = useClipboardContext()
  const mergedProps = mergeProps(api().getIndicatorProps({ copied: api().copied }), localProps)
  // @ts-expect-error TODO fix
  const getChildren = children(() => localProps.children)

  return (
    <ark.div {...mergedProps}>
      <Show when={api().copied} fallback={getChildren()}>
        {indicatorProps.copied}
      </Show>
    </ark.div>
  )
}
