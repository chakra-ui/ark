import type { ItemProps, ItemState } from '@zag-js/rating-group'
import { createContext } from '../create-context'

// TODO
export interface UseRatingGroupItemContext extends ItemProps, ItemState {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<UseRatingGroupItemContext>({
    name: 'RatingGroupItemContext',
    hookName: 'useRatingGroupItemContext',
    providerName: '<RatingGroupItemProvider />',
  })
