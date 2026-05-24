import { createContext } from '../../utils/create-context.ts'
import type { UseRatingGroupReturn } from './use-rating-group.ts'

export interface UseRatingGroupContext extends UseRatingGroupReturn {}

export const [RatingGroupProvider, useRatingGroupContext] = createContext<UseRatingGroupContext>('RatingGroupContext')
