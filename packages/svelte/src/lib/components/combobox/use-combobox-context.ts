import { createContext } from '$lib/utils/create-context'
import type { CollectionItem } from '../collection'
import type { UseComboboxReturn } from './use-combobox.svelte'

export interface UseComboboxContext<T extends CollectionItem> extends UseComboboxReturn<T> {}

export const [ComboboxProvider, useComboboxContext] = createContext<UseComboboxContext<CollectionItem>>({
  name: 'ComboboxContext',
  hookName: 'useComboboxContext',
  providerName: '<ComboboxProvider />',
})
