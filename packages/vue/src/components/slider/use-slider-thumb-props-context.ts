import type { ThumbProps } from '@zag-js/slider'
import { createContext } from '../../utils'

export const [SliderThumbPropsProvider, useSliderThumbPropsContext] =
  createContext<ThumbProps>('SliderThumbPropsContext')
