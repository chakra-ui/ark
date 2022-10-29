import { createContext } from '../createContext'
import { connect } from '@zag-js/rating'

export type RatingItemContext = ReturnType<ReturnType<typeof connect>['getRatingState']>

export const [RatingItemProvider, useRatingItemContext] = createContext<RatingItemContext>({
  name: 'RatingItemContext',
  hookName: 'useRatingItemContext',
  providerName: '<RatingItemProvider />',
})
