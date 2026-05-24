import type { ItemProps } from '@zag-js/tags-input'
import { createContext } from '../../utils/create-context.ts'

export const [TagsInputItemPropsProvider, useTagsInputItemPropsContext] = createContext<ItemProps>({
  hookName: 'useTagsInputItemPropsContext',
  providerName: '<TagsInputItemPropsProvider />',
})
