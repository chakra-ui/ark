import { createContext } from '../create-context'
import { type UseSliderReturn } from './use-slider'

export interface UseSliderContext extends UseSliderReturn {}

export const [SliderProvider, useSliderContext] = createContext<UseSliderContext>({
  hookName: 'useSliderContext',
  providerName: '<SliderProvider />',
})
