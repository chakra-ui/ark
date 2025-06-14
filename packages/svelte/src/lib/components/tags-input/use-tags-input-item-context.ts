import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'

export interface UseTagsInputItemContext extends Accessor<{ index: number; value: string }> {}

export const [TagsInputItemProvider, useTagsInputItemContext] = createContext<UseTagsInputItemContext>({
  name: 'TagsInputItemContext',
})
