import { createContext } from '$lib/utils/create-context'
import type { UseSwitchReturn } from './use-switch.svelte'

export interface UseSwitchContext extends UseSwitchReturn {}

export const [SwitchProvider, useSwitchContext] = createContext<UseSwitchContext>({
  name: 'SwitchContext',
  hookName: 'useSwitchContext',
  providerName: '<SwitchProvider />',
})
