import { type connect } from '@zag-js/rating-group'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'

export type RatingContext = ReturnType<ReturnType<typeof connect>['getRatingState']>

export const [RatingProvider, useRatingContext] = createContext<Accessor<RatingContext>>({
  hookName: 'useRatingContext',
  providerName: '<RatingProvider />',
})
