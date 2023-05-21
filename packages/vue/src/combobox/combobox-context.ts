import { type connect } from '@zag-js/combobox'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import type { UseComboboxReturn } from './use-combobox'

export const [ComboboxProvider, useComboboxContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('ComboboxContext')

export type ComboboxContext = UnwrapRef<UseComboboxReturn>
