import { createContext } from '../../utils'
import type { UsePinInputReturn } from './use-pin-input'

export interface UsePinInputContext extends UsePinInputReturn {}

export const [PinInputProvider, usePinInputContext] =
  createContext<UsePinInputContext>('PinInputContext')
