import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverArrowProps = HTMLArkProps<'div'>

export const PopoverArrow = (props: PopoverArrowProps) => {
  const popover = usePopoverContext()

  return <ark.div {...popover().arrowProps} {...props} />
}
