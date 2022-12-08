import type { connect } from '@zag-js/rating'
import { createContext } from '../create-context'

export type RatingContext = ReturnType<ReturnType<typeof connect>['getRatingState']>

export const [RatingProvider, useRatingContext] = createContext<RatingContext>({
  name: 'RatingContext',
  hookName: 'useRatingContext',
  providerName: '<RatingProvider />',
})
