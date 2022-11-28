import { createContext } from '../createContext'
import type { UseRangeSliderReturn } from './use-range-slider'

export type RangeSliderContext = UseRangeSliderReturn

export const [RangeSliderProvider, useRangeSliderContext] = createContext<RangeSliderContext>({
  hookName: 'useRangeSliderContext',
  providerName: '<RangeSliderProvider />',
})
