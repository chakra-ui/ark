import { createContext } from '../create-context'
import type { CollectionItem } from '../types'
import type { UseComboboxReturn } from './use-combobox'

export interface UseComboboxContext<T extends CollectionItem> extends UseComboboxReturn<T> {}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const [ComboboxProvider, useComboboxContext] = createContext<UseComboboxContext<any>>({
  hookName: 'useComboboxContext',
  providerName: '<ComboboxProvider />',
})
