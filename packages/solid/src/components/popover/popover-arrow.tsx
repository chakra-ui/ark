import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverArrowBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverArrowProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    PopoverArrowBaseProps {}

export const PopoverArrow = (props: PopoverArrowProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().getArrowProps(), props)

  return <ark.div {...mergedProps} />
}
