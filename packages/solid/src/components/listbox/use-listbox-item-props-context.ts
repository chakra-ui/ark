import type { ItemProps } from '@zag-js/listbox'
import { createContext } from '../../utils/create-context'

export const [ListboxItemPropsProvider, useListboxItemPropsContext] = createContext<ItemProps>({
  hookName: 'useListboxItemPropsContext',
  providerName: '<ListboxItemPropsProvider />',
})
