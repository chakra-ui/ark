import { createContext } from '../create-context'
import { type UseRatingGroupReturn } from './use-rating-group'

export interface RatingGroupContext extends UseRatingGroupReturn {}

export const [RatingGroupProvider, useRatingGroupContext] = createContext<RatingGroupContext>({
  hookName: 'useRatingGroupContext',
  providerName: '<RatingGroupProvider />',
})
