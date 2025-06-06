import { createContext } from '../../utils/create-context'
import type { UseFloatingPanelReturn } from './use-floating-panel'

export interface UseFloatingPanelContext extends UseFloatingPanelReturn {}

export const [FloatingPanelProvider, useFloatingPanelContext] = createContext<UseFloatingPanelContext>({
  name: 'FloatingPanelContext',
  hookName: 'useFloatingPanelContext',
  providerName: '<FloatingPanelProvider />',
})
