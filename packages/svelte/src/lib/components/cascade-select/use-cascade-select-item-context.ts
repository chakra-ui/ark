import type { ItemState } from '@zag-js/cascade-select'
import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'

export interface UseCascadeSelectItemContext extends Accessor<ItemState> {}

export const [CascadeSelectItemProvider, useCascadeSelectItemContext] = createContext<UseCascadeSelectItemContext>({
  name: 'CascadeSelectItemContext',
})
