import { createContext } from '../create-context'
import type { UsePinInputReturn } from './use-pin-input'

export type PinInputContext = UsePinInputReturn

export const [PinInputProvider, usePinInputContext] = createContext<PinInputContext>({
  name: 'PinInputContext',
  hookName: 'usePinInputContext',
  providerName: '<PinInputProvider />',
})
