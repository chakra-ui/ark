import { type ItemProps } from '@zag-js/rating-group'
import { createContext } from '../create-context'

export interface RatingGroupItemContext extends ItemProps {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<RatingGroupItemContext>({
    name: 'RatingGroupItemContext',
    hookName: 'useRatingGroupItemContext',
    providerName: '<RatingGroupItemProvider />',
  })
