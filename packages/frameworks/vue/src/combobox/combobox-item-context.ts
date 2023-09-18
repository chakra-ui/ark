import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../context'

export type ComboboxItemContext = ItemProps
export const [ComboboxItemProvider, useComboboxItemContext] =
  createContext<ComboboxItemContext>('ComboboxItemContext')
