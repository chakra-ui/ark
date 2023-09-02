import { createContext } from '../context'
import { type UseTabsReturn } from './use-tabs'

export type TabsContext = UseTabsReturn

export const [TabsProvider, useTabsContext] = createContext<TabsContext>('TabsContext')
