import type { ItemState } from '@zag-js/listbox'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context.ts'

export interface UseListboxItemContext extends Accessor<ItemState> {}

export const [ListboxItemProvider, useListboxItemContext] = createContext<UseListboxItemContext>({
  hookName: 'useListboxItemContext',
  providerName: '<ListboxItemProvider />',
})
