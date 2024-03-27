import { mergeProps } from '@zag-js/solid'
import { Show, children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useClipboardContext } from './use-clipboard-context'

interface ElementProps {
  copied?: JSX.Element
}

export interface ClipboardIndicatorProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const ClipboardIndicator = (props: ClipboardIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<ElementProps>()(props, ['copied'])
  const api = useClipboardContext()
  const mergedProps = mergeProps(api().getIndicatorProps({ copied: api().isCopied }), localProps)
  // @ts-expect-error TODO fix
  const getChildren = children(() => localProps.children)

  return (
    <ark.div {...mergedProps}>
      <Show when={api().isCopied} fallback={getChildren()}>
        {indicatorProps.copied}
      </Show>
    </ark.div>
  )
}
