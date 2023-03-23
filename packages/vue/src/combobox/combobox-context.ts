import { type connect } from '@zag-js/combobox'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [ComboboxProvider, useComboboxContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('ComboboxContext')
