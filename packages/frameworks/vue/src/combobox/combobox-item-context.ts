import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../context'

export interface ComboboxItemContext extends ItemProps {}

export const [ComboboxItemProvider, useComboboxItemContext] =
  createContext<ComboboxItemContext>('ComboboxItemContext')
