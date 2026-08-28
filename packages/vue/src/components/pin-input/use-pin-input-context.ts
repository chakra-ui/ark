import { createContext } from '../../utils/create-context.ts'
import type { UsePinInputReturn } from './use-pin-input.ts'

export interface UsePinInputContext extends UsePinInputReturn {}

export const [PinInputProvider, usePinInputContext] = createContext<UsePinInputContext>('PinInputContext')
