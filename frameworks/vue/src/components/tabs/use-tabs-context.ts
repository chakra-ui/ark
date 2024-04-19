import { createContext } from '../../utils'
import type { UseTabsReturn } from './use-tabs'

export interface UseTabsContext extends UseTabsReturn {}

export const [TabsProvider, useTabsContext] = createContext<UseTabsContext>('TabsContext')
