import type { ChannelProps } from '@zag-js/color-picker'
import { createContext } from '../../utils/create-context.ts'

export interface UseColorPickerChannelPropsContext extends ChannelProps {}

export const [ColorPickerChannelPropsProvider, useColorPickerChannelPropsContext] =
  createContext<UseColorPickerChannelPropsContext>({
    hookName: 'useColorPickerChannelSliderContext',
    providerName: '<ColorPickerChannelSliderProvider />',
  })
