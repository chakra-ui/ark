import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../create-context'

export interface ComboboxItemContext extends ItemProps {}

export const [ComboboxItemProvider, useComboboxItemContext] = createContext<ComboboxItemContext>({
  hookName: 'useComboboxItemContext',
  providerName: '<ComboboxItemProvider />',
})
