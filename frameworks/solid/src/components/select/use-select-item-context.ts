import type { ItemState } from '@zag-js/select'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface UseSelectItemContext extends Accessor<ItemState> {}

export const [SelectItemProvider, useSelectItemContext] = createContext<UseSelectItemContext>({
  hookName: 'useSelectItemContext',
  providerName: '<SelectItemProvider />',
})
