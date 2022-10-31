import { createContext } from '../createContext'
import type { UseTabsReturn } from './use-tabs'

export type TabsContext = UseTabsReturn

export const [TabsProvider, useTabsContext] = createContext<TabsContext>({
  name: 'TabsContext',
  hookName: 'useTabsContext',
  providerName: '<TabsProvider />',
})
