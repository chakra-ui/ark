import { createContext } from '../create-context'
import { type UseRangeSliderReturn } from './use-range-slider'

export interface RangeSliderContext extends UseRangeSliderReturn {}

export const [RangeSliderProvider, useRangeSliderContext] = createContext<RangeSliderContext>({
  name: 'RangeSliderContext',
  hookName: 'useRangeSliderContext',
  providerName: '<RangeSliderProvider />',
})
