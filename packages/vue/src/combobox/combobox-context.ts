import { createContext } from '../context'
import { type UseComboboxReturn } from './use-combobox'

export type ComboboxContext = UseComboboxReturn
export const [ComboboxProvider, useComboboxContext] =
  createContext<ComboboxContext>('ComboboxContext')
