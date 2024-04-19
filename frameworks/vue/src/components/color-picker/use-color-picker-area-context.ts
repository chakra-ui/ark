import type { AreaProps } from '@zag-js/color-picker'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface ColorPickerAreaContext extends ComputedRef<AreaProps> {}

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<ColorPickerAreaContext>('ColorPickerAreaContext')
