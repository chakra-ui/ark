import type { ItemProps, ItemState } from '@zag-js/tags-input'
import { createContext } from '../create-context'

// TODO unify with ItemProps and ItemState
export interface UseTagsInputItemContext extends ItemProps, ItemState {}

export const [TagsInputItemProvider, useTagsInputItemContext] =
  createContext<UseTagsInputItemContext>({
    name: 'TagsInputItemContext',
    hookName: 'useTagsInputItemContext',
    providerName: '<TagsInputItemProvider />',
  })
