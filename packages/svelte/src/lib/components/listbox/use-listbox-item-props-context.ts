import type { Accessor } from '$lib/types.js'
import type { ItemProps } from '@zag-js/listbox'
import { createContext } from '../../utils/create-context.js'

export interface UseListboxItemPropsContext extends Accessor<ItemProps> {}

export const [ListboxItemPropsProvider, useListboxItemPropsContext] = createContext<UseListboxItemPropsContext>({
  name: 'ListboxItemPropsContext',
  hookName: 'useListboxItemPropsContext',
  providerName: '<ListboxItemPropsProvider />',
})
