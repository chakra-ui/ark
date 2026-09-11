'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useHoverCardContext } from './use-hover-card-context.ts'
import type { PositionerState } from '@zag-js/hover-card'

export interface HoverCardPositionerState extends PositionerState {}

export interface HoverCardPositionerBaseProps extends PolymorphicProps<HoverCardPositionerState> {}
export interface HoverCardPositionerProps extends HTMLProps<'div'>, HoverCardPositionerBaseProps {}

export const HoverCardPositioner = forwardRef<HTMLDivElement, HoverCardPositionerProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} state={hoverCard.getPositionerState()} />
})

HoverCardPositioner.displayName = 'HoverCardPositioner'
