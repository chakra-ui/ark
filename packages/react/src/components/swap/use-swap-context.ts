import { createContext } from '../../utils/create-context'
import type { UseSwapReturn } from './use-swap'

export interface UseSwapContext extends UseSwapReturn {}

export const [SwapProvider, useSwapContext] = createContext<UseSwapContext>({
  name: 'SwapContext',
  hookName: 'useSwapContext',
  providerName: '<SwapProvider />',
})
