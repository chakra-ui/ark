import type { ChannelProps } from '@zag-js/color-picker'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export interface ColorPickerChannelSliderContext extends ComputedRef<ChannelProps> {}

export const [ColorPickerChannelSliderProvider, useColorPickerChannelSliderContext] =
  createContext<ColorPickerChannelSliderContext>('ColorPickerChannelSliderContext')
