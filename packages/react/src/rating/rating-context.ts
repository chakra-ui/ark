import { createContext } from '../createContext'
import type { UseRatingReturn } from './use-rating'

export type RatingContext = UseRatingReturn

export const [RatingProvider, useRatingContext] = createContext<RatingContext>({
  name: 'RatingContext',
  hookName: 'useRatingContext',
  providerName: '<RatingProvider />',
})
