'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import type { ControlState } from '@zag-js/floating-panel'

export interface FloatingPanelControlState extends ControlState {}

export interface FloatingPanelControlBaseProps extends PolymorphicProps<FloatingPanelControlState> {}
export interface FloatingPanelControlProps extends HTMLProps<'div'>, FloatingPanelControlBaseProps {}

export const FloatingPanelControl = forwardRef<HTMLDivElement, FloatingPanelControlProps>((props, ref) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} state={floatingPanel.getControlState()} />
})

FloatingPanelControl.displayName = 'FloatingPanelControl'
