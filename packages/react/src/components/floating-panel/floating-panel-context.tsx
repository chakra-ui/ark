import type { ReactNode } from 'react'
import { type UseFloatingPanelContext, useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelContextProps {
  children: (context: UseFloatingPanelContext) => ReactNode
}

export const FloatingPanelContext = (props: FloatingPanelContextProps) => props.children(useFloatingPanelContext())
