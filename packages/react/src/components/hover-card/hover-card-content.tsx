'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { usePresenceContext } from '../presence/index.ts'
import { useHoverCardContext } from './use-hover-card-context.ts'

export interface HoverCardContentBaseProps extends PolymorphicProps {}
export interface HoverCardContentProps extends HTMLProps<'div'>, HoverCardContentBaseProps {}

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(hoverCard.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

HoverCardContent.displayName = 'HoverCardContent'
