import { type connect } from '@zag-js/checkbox'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import type { UseCheckboxReturn } from './use-checkbox'

export const [CheckboxProvider, useCheckboxContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('CheckboxContext')

export type CheckboxContext = UnwrapRef<UseCheckboxReturn>
