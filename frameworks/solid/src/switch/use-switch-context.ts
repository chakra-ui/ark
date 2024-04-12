import { createContext } from '../create-context'
import type { UseSwitchReturn } from './use-switch'

export interface UseSwitchContext extends UseSwitchReturn {}

export const [SwitchProvider, useSwitchContext] = createContext<UseSwitchContext>({
  hookName: 'useSwitchContext',
  providerName: '<SwitchProvider />',
})
