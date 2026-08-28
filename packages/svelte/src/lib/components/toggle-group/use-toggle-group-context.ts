import { createContext } from '$lib/utils/create-context'
import type { UseToggleGroupReturn } from './use-toggle-group.svelte.ts'

export interface UseToggleGroupContext extends UseToggleGroupReturn {}

export const [ToggleGroupProvider, useToggleGroupContext] = createContext<UseToggleGroupContext>({
  name: 'ToggleGroupContext',
  hookName: 'useToggleGroupContext',
  providerName: '<ToggleGroupProvider />',
})
