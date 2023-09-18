import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverArrowProps = HTMLArkProps<'div'>

export const PopoverArrow = (props: PopoverArrowProps) => {
  const popover = usePopoverContext()
  const arrowProps = mergeProps(() => popover().arrowProps, props)
  return <ark.div {...arrowProps} />
}
