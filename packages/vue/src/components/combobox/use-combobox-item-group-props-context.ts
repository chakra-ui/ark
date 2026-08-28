import type { ItemGroupProps } from '@zag-js/combobox'
import { createContext } from '../../utils/create-context.ts'

export interface UseComboboxItemGroupPropsContext extends ItemGroupProps {}

export const [ComboboxItemGroupPropsProvider, useComboboxItemGroupPropsContext] =
  createContext<UseComboboxItemGroupPropsContext>('ComboboxItemGroupPropsContext')
