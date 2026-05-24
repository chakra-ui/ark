'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseFloatingPanelReturn } from './use-floating-panel.ts'

export interface UseFloatingPanelContext extends UseFloatingPanelReturn {}

export const [FloatingPanelProvider, useFloatingPanelContext] = createContext<UseFloatingPanelContext>({
  name: 'FloatingPanelContext',
  hookName: 'useFloatingPanelContext',
  providerName: '<FloatingPanelProvider />',
})
