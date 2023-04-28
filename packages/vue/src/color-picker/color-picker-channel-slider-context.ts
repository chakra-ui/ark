import type { ChannelProps } from '@zag-js/color-picker/dist/color-picker.types'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [ColorPickerSliderProvider, useColorPickerSliderContext] = createContext<
  ComputedRef<ChannelProps>
>('ColorPickerSliderContext')
