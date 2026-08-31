'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { usePresenceContext } from '../presence/index.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

export interface FloatingPanelContentBaseProps extends PolymorphicProps {}
export interface FloatingPanelContentProps extends HTMLProps<'div'>, FloatingPanelContentBaseProps {}

export const FloatingPanelContent = forwardRef<HTMLDivElement, FloatingPanelContentProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(floatingPanel.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

FloatingPanelContent.displayName = 'FloatingPanelContent'
