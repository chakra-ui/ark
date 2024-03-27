import type { ItemState } from '@zag-js/rating-group'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'

export interface UseRatingGroupItemContext extends Accessor<ItemState> {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<UseRatingGroupItemContext>({
    hookName: 'useRatingGroupItemContext',
    providerName: '<RatingGroupItemProvider />',
  })
