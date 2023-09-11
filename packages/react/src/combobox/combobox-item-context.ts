import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../create-context'

export type ComboboxItemContext = ItemProps

export const [ComboboxItemProvider, useComboboxItemContext] = createContext<ComboboxItemContext>({
  name: 'ComboboxItemContext',
  hookName: 'useComboboxItemContext',
  providerName: '<ComboboxItemProvider />',
})
