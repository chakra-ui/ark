import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverCloseButtonProps = HTMLArkProps<'button'>

export const PopoverCloseButton = (props: PopoverCloseButtonProps) => {
  const popover = usePopoverContext()

  return <ark.button {...popover().closeButtonProps} {...props} />
}
