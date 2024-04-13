import type { ItemProps, ItemState } from '@zag-js/combobox'
import type { Accessor } from 'solid-js'
import { createContext } from '~/utils/create-context'

export interface UseComboboxItemContext extends Accessor<ItemState> {}

export const [ComboboxItemProvider, useComboboxItemContext] = createContext<UseComboboxItemContext>(
  {
    hookName: 'useComboboxItemContext',
    providerName: '<ComboboxItemProvider />',
  },
)
export const [ComboboxItemPropsProvider, useComboboxItemPropsContext] = createContext<ItemProps>({
  hookName: 'useComboboxItemPropsContext',
  providerName: '<ComboboxItemPropsProvider />',
})
