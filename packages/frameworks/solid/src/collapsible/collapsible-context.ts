import { createContext } from '../create-context'
import { type UseCollapsibleReturn } from './use-collapsible'

export interface CollapsibleContext extends UseCollapsibleReturn {}

export const [CollapsibleProvider, useCollapsibleContext] = createContext<CollapsibleContext>({
  hookName: 'useCollapsibleContext',
  providerName: '<CollapsibleProvider />',
})
