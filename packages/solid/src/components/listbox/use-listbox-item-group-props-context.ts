import type { ItemGroupProps } from '@zag-js/listbox'
import { createContext } from '../../utils/create-context.ts'

export interface UseListboxItemGroupPropsContext extends ItemGroupProps {}

export const [ListboxItemGroupPropsProvider, useListboxItemGroupPropsContext] = createContext<ItemGroupProps>({
  hookName: 'useListboxItemGroupPropsContext',
  providerName: '<ListboxItemGroupPropsProvider />',
})
