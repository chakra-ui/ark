import { createContext } from '../createContext'
import type { UsePinInputReturn } from './use-pin-input'

export type PinInputContext = UsePinInputReturn

export const [PinInputProvider, usePinInputContext] = createContext<PinInputContext>({
  hookName: 'usePinInputContext',
  providerName: '<PinInputProvider />',
})
