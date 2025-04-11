import { createContext } from '../../utils'
import type { UseFloatingPanelReturn } from './use-floating-panel'

export interface UseFloatingPanelContext extends UseFloatingPanelReturn {}

export const [FloatingPanelProvider, useFloatingPanelContext] =
  createContext<UseFloatingPanelContext>('FloatingPanelContext')
