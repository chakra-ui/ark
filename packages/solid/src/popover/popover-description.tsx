import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HTMLArkProps<'div'>

export const PopoverDescription = (props: PopoverDescriptionProps) => {
  const popover = usePopoverContext()

  return <ark.div {...popover().descriptionProps} {...props} />
}
