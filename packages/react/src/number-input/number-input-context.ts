import { createContext } from '../createContext'
import type { UseNumberInputReturn } from './use-number-input'

export type NumberInputContext = UseNumberInputReturn

export const [NumberInputProvider, useNumberInputContext] = createContext<NumberInputContext>({
  name: 'NumberInputContext',
  hookName: 'useNumberInputContext',
  providerName: '<NumberInputProvider />',
})
