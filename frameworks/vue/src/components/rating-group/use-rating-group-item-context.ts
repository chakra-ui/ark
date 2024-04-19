import type { ItemProps } from '@zag-js/rating-group'
import { createContext } from '../../utils'

export interface UseRatingGroupItemContext extends ItemProps {}

export const [RatingGroupItemProvider, useRatingGroupItemContext] =
  createContext<UseRatingGroupItemContext>('RatingGroupItemContext')
