import type { ChannelProps } from '@zag-js/color-picker'
import { createContext } from '~/utils/context'

export interface ColorPickerChannelSliderContext extends ChannelProps {}

export const [ColorPickerChannelSliderProvider, useColorPickerChannelSliderContext] =
  createContext<ColorPickerChannelSliderContext>('ColorPickerChannelSliderContext')
