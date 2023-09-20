import { createContext } from '../context'
import type { UseTagsInputReturn } from './use-tags-input'

export type TagsInputContext = UseTagsInputReturn

export const [TagsInputProvider, useTagsInputContext] =
  createContext<TagsInputContext>('TagsInputContext')
