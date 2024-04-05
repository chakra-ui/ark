import type { ItemState } from '@zag-js/tags-input'
import { createContext } from '../create-context'

export interface UseTagsInputItemContext extends ItemState {}

export const [TagsInputItemProvider, useTagsInputItemContext] =
  createContext<UseTagsInputItemContext>({
    name: 'TagsInputItemContext',
    hookName: 'useTagsInputItemContext',
    providerName: '<TagsInputItemProvider />',
  })
