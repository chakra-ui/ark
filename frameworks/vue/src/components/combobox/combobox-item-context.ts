import type { ItemProps } from '@zag-js/combobox'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface ComboboxItemContext extends ComputedRef<ItemProps> {}

export const [ComboboxItemProvider, useComboboxItemContext] =
  createContext<ComboboxItemContext>('ComboboxItemContext')
