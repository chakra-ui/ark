import { createContext } from '../../utils'
import type { UseSliderReturn } from './use-slider'

export interface UseSliderContext extends UseSliderReturn {}

export const [SliderProvider, useSliderContext] = createContext<UseSliderContext>('SliderContext')
