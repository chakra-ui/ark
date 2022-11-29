import { createContext } from '../createContext'
import type { UseTagsInputReturn } from './use-tags-input'

export type TagsInputContext = UseTagsInputReturn

export const [TagsInputProvider, useTagsInputContext] = createContext<TagsInputContext>({
  hookName: 'useTagsInputContext',
  providerName: '<TagsInputProvider />',
})
