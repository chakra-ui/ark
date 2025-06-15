import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemGroupProps } from '@zag-js/combobox'

export interface UseComboboxItemGroupPropsContext extends Accessor<ItemGroupProps> {}

export const [ComboboxItemGroupPropsProvider, useComboboxItemGroupPropsContext] =
  createContext<UseComboboxItemGroupPropsContext>({
    name: 'ComboboxItemGroupPropsContext',
  })
