import { createContext } from '../../utils/create-context.ts'
import type { UseSliderReturn } from './use-slider.ts'

export interface UseSliderContext extends UseSliderReturn {}

export const [SliderProvider, useSliderContext] = createContext<UseSliderContext>('SliderContext')
