import { createContext } from '../context'
import type { UseRatingGroupReturn } from './use-rating-group'

export type RatingGroupContext = UseRatingGroupReturn

export const [RatingGroupProvider, useRatingGroupContext] =
  createContext<RatingGroupContext>('RatingGroupContext')
