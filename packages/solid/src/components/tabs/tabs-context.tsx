import type { JSX } from '@solidjs/web'
import { type UseTabsContext, useTabsContext } from './use-tabs-context.ts'

export interface TabsContextProps {
  children: (context: UseTabsContext) => JSX.Element
}

export const TabsContext = (props: TabsContextProps) => props.children(useTabsContext())
