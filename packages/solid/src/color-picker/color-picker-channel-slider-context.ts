import type { ColorChannelProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export const [ColorPickerChannelSliderProvider, useColorPickerChannelSliderContext] =
  createContext<ColorChannelProps>({
    hookName: 'useColorPickerChannelSliderContext',
    providerName: '<ColorPickerChannelSliderProvider />',
  })
