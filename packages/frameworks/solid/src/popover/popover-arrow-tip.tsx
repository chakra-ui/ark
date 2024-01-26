import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverArrowTipProps extends HTMLArkProps<'div'> {}

export const PopoverArrowTip: ArkComponent<'div'> = (props: PopoverArrowTipProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().arrowTipProps, props)

  return <ark.div {...mergedProps} />
}
