import { createContext } from '../../utils/create-context'
import type { UseRatingGroupReturn } from './use-rating-group'

export interface UseRatingGroupContext extends UseRatingGroupReturn {}

export const [RatingGroupProvider, useRatingGroupContext] = createContext<UseRatingGroupContext>({
  hookName: 'useRatingGroupContext',
  providerName: '<RatingGroupProvider />',
})
