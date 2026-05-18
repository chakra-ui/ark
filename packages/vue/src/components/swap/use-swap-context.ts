import { createContext } from '../../utils/create-context.ts'
import type { UseSwapReturn } from './use-swap.ts'

export interface UseSwapContext extends UseSwapReturn {}

export const [SwapProvider, useSwapContext] = createContext<UseSwapContext>('SwapContext')
