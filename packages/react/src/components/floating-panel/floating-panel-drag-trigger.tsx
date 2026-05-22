'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelDragTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelDragTriggerProps extends HTMLProps<'div'>, FloatingPanelDragTriggerBaseProps {}

export const FloatingPanelDragTrigger = ({ ref, ...props }: FloatingPanelDragTriggerProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getDragTriggerProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

FloatingPanelDragTrigger.displayName = 'FloatingPanelDragTrigger'
