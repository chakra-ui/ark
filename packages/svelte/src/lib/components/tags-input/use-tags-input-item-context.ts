import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemState } from '@zag-js/tags-input'

export interface UseTagsInputItemContext extends Accessor<ItemState> {}

export const [TagsInputItemProvider, useTagsInputItemContext] = createContext<UseTagsInputItemContext>({
  name: 'TagsInputItemContext',
})
