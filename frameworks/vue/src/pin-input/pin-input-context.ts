import { createContext } from '../context'
import type { UsePinInputReturn } from './use-pin-input'

export interface PinInputContext extends UsePinInputReturn {}

export const [PinInputProvider, usePinInputContext] =
  createContext<PinInputContext>('PinInputContext')
