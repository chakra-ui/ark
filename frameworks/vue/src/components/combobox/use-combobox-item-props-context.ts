import type { ItemProps } from '@zag-js/combobox'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface UseComboboxItemPropsContext extends Ref<ItemProps> {}

export const [ComboboxItemPropsProvider, useComboboxItemPropsContext] =
  createContext<UseComboboxItemPropsContext>('ComboboxItemPropsContext')
