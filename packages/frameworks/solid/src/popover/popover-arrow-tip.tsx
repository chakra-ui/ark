import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverArrowTipProps = HTMLArkProps<'div'>

export const PopoverArrowTip = (props: PopoverArrowTipProps) => {
  const popover = usePopoverContext()
  const arrowTipProps = mergeProps(() => popover().arrowTipProps, props)
  return <ark.div {...arrowTipProps} />
}
