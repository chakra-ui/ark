'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

export interface FloatingPanelTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelTriggerProps extends HTMLProps<'button'>, FloatingPanelTriggerBaseProps {}

export const FloatingPanelTrigger = forwardRef<HTMLButtonElement, FloatingPanelTriggerProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()

  const triggerProps = floatingPanel.getTriggerProps()
  const mergedProps = mergeProps(
    {
      ...triggerProps,
      'aria-controls': presence.unmounted ? undefined : triggerProps['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

FloatingPanelTrigger.displayName = 'FloatingPanelTrigger'
