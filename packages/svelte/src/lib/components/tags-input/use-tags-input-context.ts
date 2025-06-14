import { createContext } from '$lib/utils/create-context'
import type { UseTagsInputReturn } from './use-tags-input.svelte'

export interface UseTagsInputContext extends UseTagsInputReturn {}

export const [TagsInputProvider, useTagsInputContext] = createContext<UseTagsInputContext>({
  name: 'TagsInputContext',
})
