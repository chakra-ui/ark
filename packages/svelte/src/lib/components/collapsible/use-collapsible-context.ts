import { createContext } from '$lib/utils/create-context'
import type { UseCollapsibleReturn } from './use-collapsible.svelte'

export interface UseCollapsibleContext extends UseCollapsibleReturn {}
export const [CollapsibleProvider, useCollapsibleContext] = createContext<UseCollapsibleContext>({
  name: 'CollapsibleContext',
})
