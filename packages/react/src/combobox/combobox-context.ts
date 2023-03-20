import { createContext } from '../create-context'
import { type UseComboboxReturn } from './use-combobox'

export type ComboboxContext = UseComboboxReturn

export const [ComboboxProvider, useComboboxContext] = createContext<ComboboxContext>({
  name: 'ComboboxContext',
  hookName: 'useComboboxContext',
  providerName: '<ComboboxProvider />',
})
