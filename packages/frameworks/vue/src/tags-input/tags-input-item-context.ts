import type { ItemProps } from '@zag-js/tags-input'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export type TagsInputItemContext = ComputedRef<ItemProps>

export const [TagsInputItemProvider, useTagsInputItemContext] =
  createContext<TagsInputItemContext>('TagsInputItemContext')
