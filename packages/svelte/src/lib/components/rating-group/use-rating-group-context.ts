import { createContext } from '$lib/utils/create-context'
import type { UseRatingGroupReturn } from './use-rating-group.svelte'

export interface UseRatingGroupContext extends UseRatingGroupReturn {}

export const [RatingGroupProvider, useRatingGroupContext] = createContext<UseRatingGroupContext>({
  name: 'RatingGroupContext',
  hookName: 'useRatingGroupContext',
  providerName: '<RatingGroupProvider />',
})
