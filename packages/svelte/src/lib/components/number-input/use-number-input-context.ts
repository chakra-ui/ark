import { createContext } from '$lib/utils/create-context'
import type { UseNumberInputReturn } from './use-number-input.svelte.ts'

export interface UseNumberInputContext extends UseNumberInputReturn {}

export const [NumberInputProvider, useNumberInputContext] = createContext<UseNumberInputContext>({
  name: 'NumberInputContext',
  hookName: 'useNumberInputContext',
  providerName: '<NumberInputProvider />',
})
