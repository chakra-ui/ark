import type { ThumbProps } from '@zag-js/slider'
import { createContext } from '../../utils/create-context'

export const [SliderThumbPropsProvider, useSliderThumbPropsContext] = createContext<ThumbProps>({
  name: 'SliderThumbPropsContext',
  hookName: 'useSliderThumbPropsContext',
  providerName: '<SliderThumbPropsProvider />',
})
