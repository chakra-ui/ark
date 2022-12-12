import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverArrowTipProps = HTMLArkProps<'div'>

export const PopoverArrowTip = (props: PopoverArrowTipProps) => {
  const popover = usePopoverContext()

  return <ark.div {...popover().arrowTipProps} {...props} />
}
