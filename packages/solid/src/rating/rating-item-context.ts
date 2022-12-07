import type { connect } from '@zag-js/rating'
import { createContext } from '../create-context'

export type RatingItemContext = ReturnType<ReturnType<typeof connect>['getRatingState']>

export const [RatingItemProvider, useRatingItemContext] = createContext<RatingItemContext>({
  hookName: 'useRatingItemContext',
  providerName: '<RatingItemProvider />',
})
