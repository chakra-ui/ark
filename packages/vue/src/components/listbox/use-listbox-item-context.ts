import type { ItemState } from '@zag-js/listbox'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseListboxItemContext extends ComputedRef<ItemState> {}

export const [ListboxItemProvider, useListboxItemContext] = createContext<UseListboxItemContext>('ListboxItemContext')
