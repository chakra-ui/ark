import type { ItemProps } from '@zag-js/tags-input'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseTagsInputItemContext extends ComputedRef<ItemProps> {}

export const [TagsInputItemProvider, useTagsInputItemContext] =
  createContext<UseTagsInputItemContext>('TagsInputItemContext')
