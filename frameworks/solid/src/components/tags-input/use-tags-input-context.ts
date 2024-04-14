import { createContext } from '../../utils/create-context'
import type { UseTagsInputReturn } from './use-tags-input'

export interface UseTagsInputContext extends UseTagsInputReturn {}

export const [TagsInputProvider, useTagsInputContext] = createContext<UseTagsInputContext>({
  hookName: 'useTagsInputContext',
  providerName: '<TagsInputProvider />',
})
