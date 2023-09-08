import { createContext } from '../context'
import { type UseNumberInputReturn } from './use-number-input'

export type NumberInputContext = UseNumberInputReturn

export const [NumberInputProvider, useNumberInputContext] =
  createContext<NumberInputContext>('NumberInputContext')
