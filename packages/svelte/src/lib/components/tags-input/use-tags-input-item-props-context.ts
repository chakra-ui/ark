import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemProps } from '@zag-js/tags-input'

export interface UseTagsInputItemPropsContext extends Accessor<ItemProps> {}

export const [TagsInputItemPropsProvider, useTagsInputItemPropsContext] = createContext<UseTagsInputItemPropsContext>({
  name: 'TagsInputItemPropsContext',
})
