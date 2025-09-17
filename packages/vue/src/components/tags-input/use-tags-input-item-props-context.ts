import type { ItemProps } from '@zag-js/tags-input'
import { createContext } from '../../utils/create-context'

export interface UseTagsInputItemPropsContext extends ItemProps {}

export const [TagsInputItemPropsProvider, useTagsInputItemPropsContext] =
  createContext<UseTagsInputItemPropsContext>('TagsInputItemPropsContext')
