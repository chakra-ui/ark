import { type ItemState } from '@zag-js/rating-group'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'

export type RatingGroupItemContext = Accessor<ItemState>

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<RatingGroupItemContext>({
    hookName: 'useRatingGroupItemContext',
    providerName: '<RatingGroupItemProvider />',
  })
