import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../../utils/create-context.ts'

export interface UseComboboxItemPropsContext extends ItemProps {}

export const [ComboboxItemPropsProvider, useComboboxItemPropsContext] =
  createContext<UseComboboxItemPropsContext>('ComboboxItemPropsContext')
