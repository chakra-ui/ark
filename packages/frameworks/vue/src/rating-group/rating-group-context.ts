import { type connect } from '@zag-js/rating-group'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'
import { type UseRatingGroupReturn } from './use-rating-group'

export const [RatingGroupProvider, useRatingGroupContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('RatingGroupContext')

export type RatingGroupContext = UseRatingGroupReturn
