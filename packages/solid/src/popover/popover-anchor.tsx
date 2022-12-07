import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverAnchorProps = HTMLArkProps<'div'>

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const popover = usePopoverContext()

  return <ark.div {...popover().anchorProps} {...props} />
}
