import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { CollectionItem } from '../collection'

export interface UseSelectItemPropsContext<T extends CollectionItem = CollectionItem>
  extends Accessor<{ item: T; disabled?: boolean }> {}

export const [SelectItemPropsProvider, useSelectItemPropsContext] = createContext<UseSelectItemPropsContext>({
  name: 'SelectItemPropsContext',
})
