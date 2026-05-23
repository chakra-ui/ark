import type { ItemProps } from '@zag-js/cascade-select'
import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'

export interface UseCascadeSelectItemPropsContext extends Accessor<ItemProps> {}

export const [CascadeSelectItemPropsProvider, useCascadeSelectItemPropsContext] =
  createContext<UseCascadeSelectItemPropsContext>({
    name: 'CascadeSelectItemPropsContext',
  })
