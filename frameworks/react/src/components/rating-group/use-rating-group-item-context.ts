import type { ItemState } from '@zag-js/rating-group'
import { createContext } from '../../utils/create-context'

export interface UseRatingGroupItemContext extends ItemState {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<UseRatingGroupItemContext>({
    name: 'RatingGroupItemContext',
    hookName: 'useRatingGroupItemContext',
    providerName: '<RatingGroupItemProvider />',
  })
