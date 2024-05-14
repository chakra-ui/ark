import type { ItemGroupProps } from '@zag-js/combobox'
import { createContext } from '../../utils/create-context'

export interface UseComboboxItemGroupPropsContext extends ItemGroupProps {}

export const [ComboboxItemGroupPropsProvider, useComboboxItemGroupPropsContext] =
  createContext<ItemGroupProps>({
    name: 'ComboboxItemGroupPropsContext',
    hookName: 'useComboboxItemGroupPropsContext',
    providerName: '<ComboboxItemGroupPropsProvider />',
  })
