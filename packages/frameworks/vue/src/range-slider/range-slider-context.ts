import { createContext } from '../context'
import { type UseRangeSliderReturn } from './use-range-slider'

export type RangeSliderContext = UseRangeSliderReturn

export const [RangeSliderProvider, useRangeSliderContext] =
  createContext<RangeSliderContext>('RangeSliderContext')
