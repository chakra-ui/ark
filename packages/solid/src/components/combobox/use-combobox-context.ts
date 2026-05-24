import { createContext } from '../../utils/create-context.ts'
import type { CollectionItem } from '../collection/index.tsx'
import type { UseComboboxReturn } from './use-combobox.ts'

export interface UseComboboxContext<T extends CollectionItem> extends UseComboboxReturn<T> {}

export const [ComboboxProvider, useComboboxContext] = createContext<UseComboboxContext<any>>({
  hookName: 'useComboboxContext',
  providerName: '<ComboboxProvider />',
})
