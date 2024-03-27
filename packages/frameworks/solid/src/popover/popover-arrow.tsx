import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverArrowProps extends HTMLArkProps<'div'> {}

export const PopoverArrow = (props: PopoverArrowProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().arrowProps, props)

  return <ark.div {...mergedProps} />
}
