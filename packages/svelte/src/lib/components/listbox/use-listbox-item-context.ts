import type { Accessor } from '$lib/types.js'
import type * as listbox from '@zag-js/listbox'
import { createContext } from '../../utils/create-context.js'

export interface UseListboxItemContext extends Accessor<listbox.ItemState> {}

export const [ListboxItemProvider, useListboxItemContext] = createContext<UseListboxItemContext>({
  name: 'ListboxItemContext',
  hookName: 'useListboxItemContext',
  providerName: '<ListboxItemProvider />',
})
