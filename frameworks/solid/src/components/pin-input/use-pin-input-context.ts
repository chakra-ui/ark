import { createContext } from '~/utils/create-context'
import type { UsePinInputReturn } from './use-pin-input'

export interface UsePinInputContext extends UsePinInputReturn {}

export const [PinInputProvider, usePinInputContext] = createContext<UsePinInputContext>({
  hookName: 'usePinInputContext',
  providerName: '<PinInputProvider />',
})
