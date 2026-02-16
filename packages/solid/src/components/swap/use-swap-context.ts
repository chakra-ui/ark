import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'
import type { UseSwapReturn } from './use-swap'

export interface UseSwapContext extends Accessor<UseSwapReturn> {}

export const [SwapProvider, useSwapContext] = createContext<UseSwapContext>({
  hookName: 'useSwapContext',
  providerName: '<SwapProvider />',
})
