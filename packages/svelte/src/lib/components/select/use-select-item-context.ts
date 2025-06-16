import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemState } from '@zag-js/select'

export interface UseSelectItemContext extends Accessor<ItemState> {}

export const [SelectItemProvider, useSelectItemContext] = createContext<UseSelectItemContext>({
  name: 'SelectItemContext',
})
