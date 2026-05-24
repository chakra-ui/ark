import { createContext } from '$lib/utils/create-context'
import type { UseCollapsibleReturn } from './use-collapsible.svelte.ts'

export interface UseCollapsibleContext extends UseCollapsibleReturn {}
export const [CollapsibleProvider, useCollapsibleContext] = createContext<UseCollapsibleContext>({
  name: 'CollapsibleContext',
})
