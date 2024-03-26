import type { ItemProps, ItemState } from '@zag-js/combobox'
import { createContext } from '../create-context'

export interface UseComboboxItemContext extends ItemProps, ItemState {}

export const [ComboboxItemProvider, useComboboxItemContext] = createContext<UseComboboxItemContext>(
  {
    name: 'ComboboxItemContext',
    hookName: 'useComboboxItemContext',
    providerName: '<ComboboxItemProvider />',
  },
)
