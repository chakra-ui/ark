import type { AreaProps } from '@zag-js/color-picker'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export type ColorPickerAreaContext = ComputedRef<AreaProps>

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<ColorPickerAreaContext>('ColorPickerAreaContext')
