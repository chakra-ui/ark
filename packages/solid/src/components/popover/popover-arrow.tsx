import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverArrowProps extends HTMLArkProps<'div'> {}

export const PopoverArrow = (props: PopoverArrowProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().getArrowProps(), props)

  return <ark.div {...mergedProps} />
}
