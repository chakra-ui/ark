import type { ItemProps } from '@zag-js/combobox'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseComboboxItemContext extends ComputedRef<ItemProps> {}

export const [ComboboxItemProvider, useComboboxItemContext] =
  createContext<UseComboboxItemContext>('ComboboxItemContext')
