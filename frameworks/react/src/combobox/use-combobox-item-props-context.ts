import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../create-context'

export interface UseComboboxItemPropsContext extends ItemProps {}

export const [ComboboxItemPropsProvider, useComboboxItemPropsContext] = createContext<ItemProps>({
  name: 'ComboboxItemPropsContext',
  hookName: 'useComboboxItemPropsContext',
  providerName: '<ComboboxItemPropsProvider />',
})
