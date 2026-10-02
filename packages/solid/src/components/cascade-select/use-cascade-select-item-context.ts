import type { ItemState } from '@zag-js/cascade-select'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface UseCascadeSelectItemContext extends Accessor<ItemState> {}

export const [CascadeSelectItemProvider, useCascadeSelectItemContext] = createContext<UseCascadeSelectItemContext>({
  hookName: 'useCascadeSelectItemContext',
  providerName: '<CascadeSelectItemProvider />',
})
