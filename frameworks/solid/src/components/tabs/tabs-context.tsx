import type { JSX } from 'solid-js'
import { type UseTabsContext, useTabsContext } from './use-tabs-context'

export interface TabsContextProps {
  children: (context: UseTabsContext) => JSX.Element
}

export const TabsContext = (props: TabsContextProps) => props.children(useTabsContext())
