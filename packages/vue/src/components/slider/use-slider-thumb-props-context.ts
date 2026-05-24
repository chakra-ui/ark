import type { ThumbProps } from '@zag-js/slider'
import { createContext } from '../../utils/create-context.ts'

export const [SliderThumbPropsProvider, useSliderThumbPropsContext] =
  createContext<ThumbProps>('SliderThumbPropsContext')
