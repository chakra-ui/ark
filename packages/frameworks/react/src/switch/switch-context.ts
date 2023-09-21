import { createContext } from '../create-context'
import { type UseSwitchReturn } from './use-switch'

export interface SwitchContext extends UseSwitchReturn {}

export const [SwitchProvider, useSwitchContext] = createContext<SwitchContext>({
  name: 'SwitchContext',
  hookName: 'useSwitchContext',
  providerName: '<SwitchProvider />',
})
