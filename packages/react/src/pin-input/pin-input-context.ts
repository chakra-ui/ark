import { createContext } from '../createContext'
import { UsePinInputReturn } from './use-pin-input'

export type PinInputContext = Omit<UsePinInputReturn, 'htmlProps'>

export const [PinInputProvider, usePinInputContext] = createContext<PinInputContext>({
  name: 'PinInputContext',
  hookName: 'usePinInputContext',
  providerName: '<PinInputProvider />',
})
