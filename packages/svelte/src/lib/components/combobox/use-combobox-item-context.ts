import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemState } from '@zag-js/combobox'

export interface UseComboboxItemContext extends Accessor<ItemState> {}

export const [ComboboxItemProvider, useComboboxItemContext] = createContext<UseComboboxItemContext>({
  name: 'ComboboxItemContext',
  hookName: 'useComboboxItemContext',
  providerName: '<ComboboxItemProvider />',
})
