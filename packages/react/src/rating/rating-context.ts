import { createContext } from '../createContext'
import { UseRatingReturn } from './use-rating'

export type RatingContext = UseRatingReturn['api']

export const [RatingProvider, useRatingContext] = createContext<RatingContext>({
  name: 'RatingContext',
  hookName: 'useRatingContext',
  providerName: '<RatingProvider />',
})
