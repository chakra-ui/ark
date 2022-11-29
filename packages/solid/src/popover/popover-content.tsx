import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverContentProps = HTMLArkProps<'div'>

export const PopoverContent = (props: PopoverContentProps) => {
  const popover = usePopoverContext()

  return <ark.div {...popover().contentProps} {...props} />
}
