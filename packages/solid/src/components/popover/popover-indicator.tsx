import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    PopoverIndicatorBaseProps {}

export const PopoverIndicator = (props: PopoverIndicatorProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}
