import { createContext } from '../context'
import { type UseSliderReturn } from './use-slider'

export interface SliderContext extends UseSliderReturn {}

export const [SliderProvider, useSliderContext] = createContext<SliderContext>('SliderContext')
