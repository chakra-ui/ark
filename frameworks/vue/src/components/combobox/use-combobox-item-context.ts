import type { ItemState } from '@zag-js/combobox'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseComboboxItemContext extends ComputedRef<ItemState> {}

export const [ComboboxItemProvider, useComboboxItemContext] =
  createContext<UseComboboxItemContext>('ComboboxItemContext')
