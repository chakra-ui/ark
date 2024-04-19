import { createContext } from '../../utils'
import type { UseRatingGroupReturn } from './use-rating-group'

export interface RatingGroupContext extends UseRatingGroupReturn {}

export const [RatingGroupProvider, useRatingGroupContext] =
  createContext<RatingGroupContext>('RatingGroupContext')
