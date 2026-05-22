'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverArrowBaseProps extends PolymorphicProps {}
export interface PopoverArrowProps extends HTMLProps<'div'>, PopoverArrowBaseProps {}

export const PopoverArrow = ({ ref, ...props }: PopoverArrowProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

PopoverArrow.displayName = 'PopoverArrow'
