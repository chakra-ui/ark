import { mergeProps } from '@zag-js/solid'
import { type JSX, Show, children } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

interface IndicatorProps {
  copied?: JSX.Element
}

export interface ClipboardIndicatorBaseProps extends IndicatorProps, PolymorphicProps<'div'> {}
export interface ClipboardIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ClipboardIndicatorBaseProps {}

export const ClipboardIndicator = (props: ClipboardIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, ['copied'])
  const api = useClipboardContext()
  const mergedProps = mergeProps(api().getIndicatorProps({ copied: api().copied }), localProps)
  const getChildren = children(() => localProps.children)

  return (
    <ark.div {...mergedProps}>
      <Show when={api().copied} fallback={getChildren()}>
        {indicatorProps.copied}
      </Show>
    </ark.div>
  )
}
