import type { ColorChannelProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export const [ColorPickerSliderProvider, useColorPickerSliderContext] =
  createContext<ColorChannelProps>({
    name: 'ColorPickerSliderContext',
    hookName: 'useColorPickerSliderContext',
    providerName: '<ColorPickerSliderProvider />',
  })
