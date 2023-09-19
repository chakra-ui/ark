import type { ColorSwatchProps } from '@zag-js/color-picker'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export type ColorPickerSwatchContext = ComputedRef<ColorSwatchProps>

export const [ColorPickerSwatchProvider, useColorPickerSwatchContext] =
  createContext<ColorPickerSwatchContext>('ColorPickerSwatchContext')
