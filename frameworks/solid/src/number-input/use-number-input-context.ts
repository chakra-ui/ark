import { createContext } from '../create-context'
import type { UseNumberInputReturn } from './use-number-input'

export interface UseNumberInputContext extends UseNumberInputReturn {}

export const [NumberInputProvider, useNumberInputContext] = createContext<UseNumberInputContext>({
  hookName: 'useNumberInputContext',
  providerName: '<NumberInputProvider />',
})
