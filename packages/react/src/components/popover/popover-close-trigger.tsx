'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverCloseTriggerBaseProps extends PolymorphicProps {}
export interface PopoverCloseTriggerProps extends HTMLProps<'button'>, PopoverCloseTriggerBaseProps {}

export const PopoverCloseTrigger = ({ ref, ...props }: PopoverCloseTriggerProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

PopoverCloseTrigger.displayName = 'PopoverCloseTrigger'
