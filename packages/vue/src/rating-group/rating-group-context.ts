import type { connect } from '@zag-js/rating-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export const [RatingGroupProvider, useRatingGroupContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('RatingGroupContext')

// TODO: export type RatingGroupContext = UseRatingGroupReturn
