import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export type PopoverArrowBaseProps = {}
export interface PopoverArrowProps extends HTMLArkProps<'div'>, PopoverArrowBaseProps {}

export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverArrow.displayName = 'PopoverArrow'
