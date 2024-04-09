import { createContext } from '../create-context'
import type { CollectionItem } from '../types'
import { type UseComboboxReturn } from './use-combobox'

export interface UseComboboxContext<T extends CollectionItem> extends UseComboboxReturn<T> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const [ComboboxProvider, useComboboxContext] = createContext<UseComboboxContext<any>>({
  hookName: 'useComboboxContext',
  providerName: '<ComboboxProvider />',
})
