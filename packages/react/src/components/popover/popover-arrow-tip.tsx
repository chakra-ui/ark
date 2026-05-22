'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverArrowTipBaseProps extends PolymorphicProps {}
export interface PopoverArrowTipProps extends HTMLProps<'div'>, PopoverArrowTipBaseProps {}

export const PopoverArrowTip = ({ ref, ...props }: PopoverArrowTipProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

PopoverArrowTip.displayName = 'PopoverArrowTip'
