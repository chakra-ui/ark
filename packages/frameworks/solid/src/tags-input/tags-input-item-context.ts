import type { ItemProps } from '@zag-js/tags-input'
import { createContext } from '../create-context'

export interface TagsInputItemContext extends ItemProps {}

export const [TagsInputItemProvider, useTagsInputItemContext] = createContext<TagsInputItemContext>(
  {
    hookName: 'useTagsInputItemContext',
    providerName: '<TagsInputItemProvider />',
  },
)
