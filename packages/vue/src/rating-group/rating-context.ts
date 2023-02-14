import type { connect } from '@zag-js/rating-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export type RatingContext = ReturnType<ReturnType<typeof connect>['getRatingState']>

export const [RatingProvider, useRatingContext] =
  createContext<ComputedRef<ReturnType<ReturnType<typeof connect>['getRatingState']>>>(
    'RatingContext',
  )
