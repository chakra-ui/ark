import type { ItemProps } from '@zag-js/tags-input'
import { createContext } from '../create-context'

export const [TagsInputItemPropsProvider, useTagsInputItemPropsContext] = createContext<ItemProps>({
  name: 'TagsInputItemPropsContext',
  hookName: 'useTagsInputItemPropsContext',
  providerName: '<TagsInputItemPropsProvider />',
})
