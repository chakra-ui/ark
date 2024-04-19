import type { ItemProps } from '@zag-js/rating-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseRatingGroupItemContext extends ComputedRef<ItemProps> {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<UseRatingGroupItemContext>('RatingGroupItemContext')
