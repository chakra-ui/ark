import { createContext } from '$lib/utils/create-context'
import type { UseSliderReturn } from './use-slider.svelte.ts'

export interface UseSliderContext extends UseSliderReturn {}
export const [SliderProvider, useSliderContext] = createContext<UseSliderContext>({
  name: 'SliderContext',
})
