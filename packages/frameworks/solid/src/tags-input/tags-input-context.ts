import { createContext } from '../create-context'
import { type UseTagsInputReturn } from './use-tags-input'

export interface TagsInputContext extends UseTagsInputReturn {}

export const [TagsInputProvider, useTagsInputContext] = createContext<TagsInputContext>({
  hookName: 'useTagsInputContext',
  providerName: '<TagsInputProvider />',
})
