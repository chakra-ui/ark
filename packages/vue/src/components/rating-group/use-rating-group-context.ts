import { createContext } from '../../utils'
import type { UseRatingGroupReturn } from './use-rating-group'

export interface UseRatingGroupContext extends UseRatingGroupReturn {}

export const [RatingGroupProvider, useRatingGroupContext] =
  createContext<UseRatingGroupContext>('RatingGroupContext')
