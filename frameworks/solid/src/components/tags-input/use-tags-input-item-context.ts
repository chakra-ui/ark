import type { ItemProps, ItemState } from '@zag-js/tags-input'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface UseTagsInputItemContext extends Accessor<ItemState> {}

export const [TagsInputItemProvider, useTagsInputItemContext] =
  createContext<UseTagsInputItemContext>({
    hookName: 'useTagsInputItemContext',
    providerName: '<TagsInputItemProvider />',
  })

export const [TagsInputItemPropsProvider, useTagsInputItemPropsContext] = createContext<ItemProps>({
  hookName: 'useTagsInputItemPropsContext',
  providerName: '<TagsInputItemPropsProvider />',
})
