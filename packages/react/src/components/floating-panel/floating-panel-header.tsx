'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelHeaderBaseProps extends PolymorphicProps {}
export interface FloatingPanelHeaderProps extends HTMLProps<'div'>, FloatingPanelHeaderBaseProps {}

export const FloatingPanelHeader = ({ ref, ...props }: FloatingPanelHeaderProps) => {
  const floatingPanel = useFloatingPanelContext()
  const mergedProps = mergeProps(floatingPanel.getHeaderProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

FloatingPanelHeader.displayName = 'FloatingPanelHeader'
