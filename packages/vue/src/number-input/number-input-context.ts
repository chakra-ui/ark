import { type connect } from '@zag-js/number-input'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'
import { type UseNumberInputReturn } from './use-number-input'

export const [NumberInputProvider, useNumberInputContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('NumberInputContext')

export type NumberInputContext = UseNumberInputReturn
