'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { usePresenceContext } from '../presence/index.ts'
import { useTooltipContext } from './use-tooltip-context.ts'
import type { ContentState } from '@zag-js/tooltip'

export interface TooltipContentState extends ContentState {}

export interface TooltipContentBaseProps extends PolymorphicProps<TooltipContentState> {}
export interface TooltipContentProps extends HTMLProps<'div'>, TooltipContentBaseProps {}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const tooltip = useTooltipContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(tooltip.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} state={tooltip.getContentState()} />
    </PresenceGate>
  )
})

TooltipContent.displayName = 'TooltipContent'
