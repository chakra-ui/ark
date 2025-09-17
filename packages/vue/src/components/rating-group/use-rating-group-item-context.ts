import type { ItemState } from '@zag-js/rating-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseRatingGroupItemContext extends ComputedRef<ItemState> {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<UseRatingGroupItemContext>('RatingGroupItemContext')
