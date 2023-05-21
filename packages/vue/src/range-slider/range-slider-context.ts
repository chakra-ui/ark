import { type connect } from '@zag-js/range-slider'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UseRangeSliderReturn } from './use-range-slider'

export const [RangeSliderProvider, useRangeSliderContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('RangeSliderContext')

export type RangeSliderContext = UnwrapRef<UseRangeSliderReturn>
