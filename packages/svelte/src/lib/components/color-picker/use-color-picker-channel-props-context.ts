import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ChannelProps } from '@zag-js/color-picker'

export interface UseColorPickerChannelPropsContext extends Accessor<ChannelProps> {}

export const [ColorPickerChannelPropsProvider, useColorPickerChannelPropsContext] =
  createContext<UseColorPickerChannelPropsContext>({
    name: 'ColorPickerChannelPropsContext',
    hookName: 'useColorPickerChannelPropsContext',
    providerName: '<ColorPickerChannelPropsProvider />',
    strict: false,
  })
