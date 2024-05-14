import { createContext } from '../../utils'
import type { UseNumberInputReturn } from './use-number-input'

export interface UseNumberInputContext extends UseNumberInputReturn {}

export const [NumberInputProvider, useNumberInputContext] =
  createContext<UseNumberInputContext>('NumberInputContext')
