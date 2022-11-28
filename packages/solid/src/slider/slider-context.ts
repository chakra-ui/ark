import { createContext } from '../createContext'
import type { UseSliderReturn } from './use-slider'

export type SliderContext = UseSliderReturn

export const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  hookName: 'useSliderContext',
  providerName: '<SliderProvider />',
})
