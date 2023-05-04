import type { ColorChannelProps } from '@zag-js/color-picker'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [ColorPickerSliderProvider, useColorPickerSliderContext] = createContext<
  ComputedRef<ColorChannelProps>
>('ColorPickerSliderContext')
