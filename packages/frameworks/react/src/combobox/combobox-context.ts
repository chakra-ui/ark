import { createContext } from '../create-context'
import type { CollectionItem } from '../types'
import { type UseComboboxReturn } from './use-combobox'

export type ComboboxContext<T extends CollectionItem> = UseComboboxReturn<T>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const [ComboboxProvider, useComboboxContext] = createContext<ComboboxContext<any>>({
  name: 'ComboboxContext',
  hookName: 'useComboboxContext',
  providerName: '<ComboboxProvider />',
})
