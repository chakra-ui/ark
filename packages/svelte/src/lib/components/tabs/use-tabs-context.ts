import { createContext } from '$lib/utils/create-context'
import type { UseTabsReturn } from './use-tabs.svelte'

export interface UseTabsContext extends UseTabsReturn {}

export const [TabsProvider, useTabsContext] = createContext<UseTabsContext>({
  name: 'TabsContext',
  hookName: 'useTabsContext',
  providerName: '<TabsProvider />',
})
