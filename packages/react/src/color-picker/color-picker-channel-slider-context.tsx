import type { ChannelProps } from '@zag-js/color-picker/dist/color-picker.types'
import { createContext } from '../create-context'

export const [ColorPickerSliderProvider, useColorPickerSliderContext] = createContext<ChannelProps>(
  {
    name: 'ColorPickerSliderContext',
    hookName: 'useColorPickerSliderContext',
    providerName: '<ColorPickerSliderProvider />',
  },
)
