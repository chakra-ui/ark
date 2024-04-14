import { createContext } from '~/utils/context'
import type { UseTagsInputReturn } from './use-tags-input'

export interface TagsInputContext extends UseTagsInputReturn {}

export const [TagsInputProvider, useTagsInputContext] =
  createContext<TagsInputContext>('TagsInputContext')
