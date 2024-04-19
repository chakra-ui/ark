import type { ItemState } from '@zag-js/tags-input'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseTagsInputItemContext extends ComputedRef<ItemState> {}

export const [TagsInputItemProvider, useTagsInputItemContext] =
  createContext<UseTagsInputItemContext>('TagsInputItemContext')
