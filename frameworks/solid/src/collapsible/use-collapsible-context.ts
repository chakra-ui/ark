import { createContext } from '../create-context'
import type { UseCollapsibleReturn } from './use-collapsible'

export interface UseCollapsibleContext extends UseCollapsibleReturn {}

export const [CollapsibleProvider, useCollapsibleContext] = createContext<UseCollapsibleContext>({
  hookName: 'useCollapsibleContext',
  providerName: '<CollapsibleProvider />',
})
