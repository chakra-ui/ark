import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../../utils'

export interface UseComboboxItemPropsContext extends ItemProps {}

export const [ComboboxItemPropsProvider, useComboboxItemPropsContext] =
  createContext<UseComboboxItemPropsContext>('ComboboxItemPropsContext')
