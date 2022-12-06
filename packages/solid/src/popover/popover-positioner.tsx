import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverPositionerProps = HTMLArkProps<'div'>

export const PopoverPositioner = (props: PopoverPositionerProps) => {
  const popover = usePopoverContext()

  return <ark.div {...popover().positionerProps} {...props} />
}
