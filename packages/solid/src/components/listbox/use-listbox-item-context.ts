import type { ItemState } from '@zag-js/listbox'
import { createContext } from '../../utils/create-context'

export interface UseListboxItemContext extends ItemState {}

export const [ListboxItemProvider, useListboxItemContext] = createContext<UseListboxItemContext>({
  hookName: 'useListboxItemContext',
  providerName: '<ListboxItemProvider />',
})
