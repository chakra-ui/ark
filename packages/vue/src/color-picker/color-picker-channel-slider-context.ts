import type { ColorChannelProps } from '@zag-js/color-picker'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [ColorPickerChannelSliderProvider, useColorPickerChannelSliderContext] = createContext<
  ComputedRef<ColorChannelProps>
>('ColorPickerChannelSliderContext')
