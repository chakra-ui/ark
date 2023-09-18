import { createContext } from '../create-context'
import { type UseSwitchReturn } from './use-switch'

export type SwitchContext = UseSwitchReturn

export const [SwitchProvider, useSwitchContext] = createContext<SwitchContext>({
  name: 'SwitchContext',
  hookName: 'useSwitchContext',
  providerName: '<SwitchProvider />',
})
