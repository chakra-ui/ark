import { createContext } from '$lib/utils/create-context'
import type { UseSliderReturn } from './use-slider.svelte'

export interface UseSliderContext extends UseSliderReturn {}
export const [SliderProvider, useSliderContext] = createContext<UseSliderContext>({
  key: 'SliderContext',
})
