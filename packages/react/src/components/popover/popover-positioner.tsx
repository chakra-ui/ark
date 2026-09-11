'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { usePopoverContext } from './use-popover-context.ts'
import type { PositionerState } from '@zag-js/popover'

export interface PopoverPositionerState extends PositionerState {}

export interface PopoverPositionerBaseProps extends PolymorphicProps<PopoverPositionerState> {}
export interface PopoverPositionerProps extends HTMLProps<'div'>, PopoverPositionerBaseProps {}

export const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>((props, ref) => {
  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(popover.getPositionerProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} state={popover.getPositionerState()} />
})

PopoverPositioner.displayName = 'PopoverPositioner'
