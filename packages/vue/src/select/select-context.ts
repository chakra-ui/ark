import { type connect } from '@zag-js/select'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UseSelectReturn } from './use-select'

export const [SelectProvider, useSelectContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('SelectContext')

export type SelectContext = UnwrapRef<UseSelectReturn>
