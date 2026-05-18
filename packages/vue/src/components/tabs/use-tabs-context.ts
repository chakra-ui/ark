import { createContext } from '../../utils/create-context.ts'
import type { UseTabsReturn } from './use-tabs.ts'

export interface UseTabsContext extends UseTabsReturn {}

export const [TabsProvider, useTabsContext] = createContext<UseTabsContext>('TabsContext')
