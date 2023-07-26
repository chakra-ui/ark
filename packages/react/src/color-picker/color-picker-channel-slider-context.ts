import type { ColorChannelProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export const [ColorPickerChannelSliderProvider, useColorPickerChannelSliderContext] =
  createContext<ColorChannelProps>({
    name: 'ColorPickerChannelSliderContext',
    hookName: 'useColorPickerChannelSliderContext',
    providerName: '<ColorPickerChannelSliderProvider />',
  })
