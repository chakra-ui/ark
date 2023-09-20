import { type ItemState } from '@zag-js/rating-group'
import { createContext } from '../create-context'

export type RatingGroupItemContext = ItemState

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<RatingGroupItemContext>({
    hookName: 'useRatingGroupItemContext',
    providerName: '<RatingGroupItemProvider />',
  })
