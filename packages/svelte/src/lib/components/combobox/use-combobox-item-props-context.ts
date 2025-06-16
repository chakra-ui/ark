import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemProps } from '@zag-js/combobox'

export interface UseComboboxItemPropsContext extends Accessor<ItemProps> {}

export const [ComboboxItemPropsProvider, useComboboxItemPropsContext] = createContext<UseComboboxItemPropsContext>({
  name: 'ComboboxItemPropsContext',
  hookName: 'useComboboxItemPropsContext',
  providerName: '<ComboboxItemPropsProvider />',
})
