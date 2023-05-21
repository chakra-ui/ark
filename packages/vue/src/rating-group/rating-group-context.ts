import { type connect } from '@zag-js/rating-group'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UseRatingGroupReturn } from './use-rating-group'

export const [RatingGroupProvider, useRatingGroupContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('RatingGroupContext')

export type RatingGroupContext = UnwrapRef<UseRatingGroupReturn>
