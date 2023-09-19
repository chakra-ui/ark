import { type connect } from '@zag-js/checkbox'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export type CheckboxContext = ComputedRef<ReturnType<typeof connect>>

export const [CheckboxProvider, useCheckboxContext] =
  createContext<CheckboxContext>('CheckboxContext')
