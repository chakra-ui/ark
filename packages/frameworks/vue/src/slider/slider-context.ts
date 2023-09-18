import { createContext } from '../context'
import { type UseSliderReturn } from './use-slider'

export type SliderContext = UseSliderReturn

export const [SliderProvider, useSliderContext] = createContext<SliderContext>('SliderContext')
