import type { ItemProps, ItemState } from '@zag-js/combobox'
import { createContext } from '../create-context'

export interface UseComboboxItemContext extends ItemState {}

export const [ComboboxItemProvider, useComboboxItemContext] = createContext<UseComboboxItemContext>(
  {
    name: 'ComboboxItemContext',
    hookName: 'useComboboxItemContext',
    providerName: '<ComboboxItemProvider />',
  },
)
export const [ComboboxItemPropsProvider, useComboboxItemPropsContext] = createContext<ItemProps>({
  name: 'ComboboxItemPropsContext',
  hookName: 'useComboboxItemPropsContext',
  providerName: '<ComboboxItemPropsProvider />',
})
