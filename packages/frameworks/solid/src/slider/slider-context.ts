import { createContext } from '../create-context'
import { type UseSliderReturn } from './use-slider'

export type SliderContext = UseSliderReturn

export const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  hookName: 'useSliderContext',
  providerName: '<SliderProvider />',
})
