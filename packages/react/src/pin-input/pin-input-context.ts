import { createContext } from '../createContext'
import { UsePinInputReturn } from './use-pin-input'

export type PinInputContext = UsePinInputReturn['api']

export const [PinInputProvider, usePinInputContext] = createContext<PinInputContext>({
  name: 'PinInputContext',
  hookName: 'usePinInputContext',
  providerName: '<PinInputProvider />',
})
