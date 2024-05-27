import type { ThumbProps } from '@zag-js/slider'
import { createContext } from '../../utils/create-context'

export const [SliderThumbPropsProvider, useSliderThumbPropsContext] = createContext<ThumbProps>({
  hookName: 'useSliderThumbPropsContext',
  providerName: '<SliderThumbPropsProvider />',
})
