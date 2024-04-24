import type { ItemProps } from '@zag-js/tags-input'
import { createContext } from '../../utils/create-context'

export const [TagsInputItemPropsProvider, useTagsInputItemPropsContext] = createContext<ItemProps>({
  hookName: 'useTagsInputItemPropsContext',
  providerName: '<TagsInputItemPropsProvider />',
})
