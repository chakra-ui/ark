import type { ItemProps } from '@zag-js/tags-input'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface UseTagsInputItemPropsContext extends Ref<ItemProps> {}

export const [TagsInputItemPropsProvider, useTagsInputItemPropsContext] =
  createContext<UseTagsInputItemPropsContext>('TagsInputItemPropsContext')
