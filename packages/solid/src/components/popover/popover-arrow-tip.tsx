import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverArrowTipBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverArrowTipProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    PopoverArrowTipBaseProps {}

export const PopoverArrowTip = (props: PopoverArrowTipProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().getArrowTipProps(), props)

  return <ark.div {...mergedProps} />
}
