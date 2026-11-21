import type { ItemState } from '@zag-js/combobox'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context.ts'

export interface UseCommandItemContext extends Accessor<ItemState> {}

export const [CommandItemProvider, useCommandItemContext] = createContext<UseCommandItemContext>({
  hookName: 'useCommandItemContext',
  providerName: '<CommandItemProvider />',
})
