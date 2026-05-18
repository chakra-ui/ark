import { createContext } from '../../utils/create-context.ts'
import type { UseTagsInputReturn } from './use-tags-input.ts'

export interface UseTagsInputContext extends UseTagsInputReturn {}

export const [TagsInputProvider, useTagsInputContext] = createContext<UseTagsInputContext>('TagsInputContext')
