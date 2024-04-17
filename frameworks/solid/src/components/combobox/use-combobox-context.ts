import type { CollectionItem } from '../../types'
import { createContext } from '../../utils/create-context'
import type { UseComboboxReturn } from './use-combobox'

export interface UseComboboxContext<T extends CollectionItem> extends UseComboboxReturn<T> {}

export const [ComboboxProvider, useComboboxContext] = createContext<UseComboboxContext<any>>({
  hookName: 'useComboboxContext',
  providerName: '<ComboboxProvider />',
})
