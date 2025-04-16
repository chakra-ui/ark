import type { JSX } from 'solid-js'
import { type UseFloatingPanelContext, useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelContextProps {
  children: (context: UseFloatingPanelContext) => JSX.Element
}

export const FloatingPanelContext = (props: FloatingPanelContextProps) => props.children(useFloatingPanelContext())
