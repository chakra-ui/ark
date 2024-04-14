import { createContext } from '../../utils/context'
import type { UseTabsReturn } from './use-tabs'

export interface TabsContext extends UseTabsReturn {}

export const [TabsProvider, useTabsContext] = createContext<TabsContext>('TabsContext')
