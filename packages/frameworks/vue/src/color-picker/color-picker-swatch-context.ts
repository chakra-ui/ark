import type { SwatchProps } from '@zag-js/color-picker'
import { type ToRefs } from 'vue'
import { createContext } from '../context'

export type ColorPickerSwatchContext = ToRefs<SwatchProps>
export const [ColorPickerSwatchProvider, useColorPickerSwatchContext] =
  createContext<ColorPickerSwatchContext>('ColorPickerSwatchContext')
