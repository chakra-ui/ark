import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HTMLArkProps<'div'>

export const PopoverTitle = (props: PopoverTitleProps) => {
  const popover = usePopoverContext()

  return <ark.div {...popover().titleProps} {...props} />
}
