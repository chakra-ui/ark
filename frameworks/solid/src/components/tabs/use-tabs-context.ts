import { createContext } from '../../utils/create-context'
import type { UseTabsReturn } from './use-tabs'

export interface UseTabsContext extends UseTabsReturn {}

export const [TabsProvider, useTabsContext] = createContext<UseTabsContext>({
  hookName: 'useTabsContext',
  providerName: '<TabsProvider />',
})
