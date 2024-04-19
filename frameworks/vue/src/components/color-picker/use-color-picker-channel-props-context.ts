import type { ChannelProps } from '@zag-js/color-picker'
import type { Ref } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseColorPickerChannelPropsContext extends Ref<ChannelProps> {}

export const [ColorPickerChannelPropsProvider, useColorPickerChannelPropsContext] =
  createContext<UseColorPickerChannelPropsContext>('ColorPickerChannelPropsContext')
