import type { ChannelProps } from '@zag-js/color-picker'
import { type ToRefs } from 'vue'
import { createContext } from '../context'

export type ColorPickerChannelSliderContext = ToRefs<ChannelProps>

export const [ColorPickerChannelSliderProvider, useColorPickerChannelSliderContext] =
  createContext<ColorPickerChannelSliderContext>('ColorPickerChannelSliderContext')
