import { createContext } from '../../utils/create-context.ts'
import type { UseNumberInputReturn } from './use-number-input.ts'

export interface UseNumberInputContext extends UseNumberInputReturn {}

export const [NumberInputProvider, useNumberInputContext] = createContext<UseNumberInputContext>({
  hookName: 'useNumberInputContext',
  providerName: '<NumberInputProvider />',
})
