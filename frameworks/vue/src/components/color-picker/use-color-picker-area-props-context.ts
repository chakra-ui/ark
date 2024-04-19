import type { AreaProps } from '@zag-js/color-picker'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface ColorPickerAreaPropsContext extends ComputedRef<AreaProps> {}

export const [ColorPickerAreaPropsProvider, useColorPickerAreaPropsContext] =
  createContext<ColorPickerAreaPropsContext>('ColorPickerAreaPropsContext')
