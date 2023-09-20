import { type ItemState } from '@zag-js/rating-group'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export type RatingGroupItemContext = ComputedRef<ItemState>

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<RatingGroupItemContext>('RatingGroupItemContext')
