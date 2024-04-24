import { createContext } from '../../utils'
import type { UseTagsInputReturn } from './use-tags-input'

export interface UseTagsInputContext extends UseTagsInputReturn {}

export const [TagsInputProvider, useTagsInputContext] =
  createContext<UseTagsInputContext>('TagsInputContext')
