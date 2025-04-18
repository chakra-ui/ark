import type { ItemGroupProps } from '@zag-js/listbox'
import { createContext } from '../../utils/create-context'

export interface UseListboxItemGroupPropsContext extends ItemGroupProps {}

export const [ListboxItemGroupPropsProvider, useListboxItemGroupPropsContext] = createContext<ItemGroupProps>({
  name: 'ListboxItemGroupPropsContext',
  hookName: 'useListboxItemGroupPropsContext',
  providerName: '<ListboxItemGroupPropsProvider />',
})
