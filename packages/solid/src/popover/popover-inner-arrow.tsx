import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverInnerArrowProps = HTMLArkProps<'div'>

export const PopoverInnerArrow = (props: PopoverInnerArrowProps) => {
  const popover = usePopoverContext()

  return <ark.div {...popover().innerArrowProps} {...props} />
}
