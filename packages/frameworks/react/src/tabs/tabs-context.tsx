import { useTabsContext, type UseTabsContext } from './use-tabs-context'

export interface TabsContextProps {
  children: (context: UseTabsContext) => React.ReactNode
}

export const TabsContext = (props: TabsContextProps) => props.children(useTabsContext())
