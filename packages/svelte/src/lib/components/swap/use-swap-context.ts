import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { UseSwapReturn } from './use-swap.svelte'

export interface UseSwapContext extends Accessor<UseSwapReturn> {}

export const [SwapProvider, useSwapContext] = createContext<UseSwapContext>({
  name: 'SwapContext',
  hookName: 'useSwapContext',
  providerName: '<SwapProvider />',
})
