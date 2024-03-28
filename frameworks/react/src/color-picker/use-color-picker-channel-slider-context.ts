import type { ChannelProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export interface UseColorPickerChannelSliderContext extends ChannelProps {}

export const [ColorPickerChannelSliderProvider, useColorPickerChannelSliderContext] =
  createContext<UseColorPickerChannelSliderContext>({
    name: 'ColorPickerChannelSliderContext',
    hookName: 'useColorPickerChannelSliderContext',
    providerName: '<ColorPickerChannelSliderProvider />',
  })
