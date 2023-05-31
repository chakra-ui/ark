import { type connect } from '@zag-js/checkbox'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [CheckboxProvider, useCheckboxContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('CheckboxContext')

// TODO: export type CheckboxContext = UseCheckboxReturn
