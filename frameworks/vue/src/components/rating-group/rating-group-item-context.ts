import type { ItemProps } from '@zag-js/rating-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface RatingGroupItemContext extends ComputedRef<ItemProps> {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<RatingGroupItemContext>('RatingGroupItemContext')
