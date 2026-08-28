import type { ItemProps } from '@zag-js/listbox'
import { createContext } from '../../utils/create-context.ts'

export const [ListboxItemPropsProvider, useListboxItemPropsContext] = createContext<ItemProps>({
  hookName: 'useListboxItemPropsContext',
  providerName: '<ListboxItemPropsProvider />',
})
