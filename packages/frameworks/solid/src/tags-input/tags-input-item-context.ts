import type { ItemProps } from '@zag-js/tags-input'
import { createContext } from '../create-context'

export type TagsInputItemContext = ItemProps

export const [TagsInputItemProvider, useTagsInputItemContext] = createContext<TagsInputItemContext>(
  {
    hookName: 'useTagsInputItemContext',
    providerName: '<TagsInputItemProvider />',
  },
)
