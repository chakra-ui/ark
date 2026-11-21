import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemState } from '@zag-js/combobox'

export interface UseCommandItemContext extends Accessor<ItemState> {}

export const [CommandItemProvider, useCommandItemContext] = createContext<UseCommandItemContext>({
  name: 'CommandItemContext',
  hookName: 'useCommandItemContext',
  providerName: '<CommandItemProvider />',
})
