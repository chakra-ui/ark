import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverArrowTipProps extends HTMLArkProps<'div'> {}

export const PopoverArrowTip = (props: PopoverArrowTipProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().arrowTipProps, props)

  return <ark.div {...mergedProps} />
}
