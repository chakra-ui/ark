import { createContext } from '$lib/utils/create-context'
import type { ThumbProps } from '@zag-js/slider'

export const [SliderThumbPropsProvider, useSliderThumbPropsContext] = createContext<ThumbProps>({
  key: 'SliderThumbPropsContext',
})
