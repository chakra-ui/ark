import type { ItemProps } from '@zag-js/tags-input'
import { createContext } from '../../utils'

export interface UseTagsInputItemPropsContext extends ItemProps {}

export const [TagsInputItemPropsProvider, useTagsInputItemPropsContext] =
  createContext<UseTagsInputItemPropsContext>('TagsInputItemPropsContext')
