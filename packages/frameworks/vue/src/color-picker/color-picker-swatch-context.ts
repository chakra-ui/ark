import type { ColorSwatchProps } from '@zag-js/color-picker'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [ColorPickerSwatchProvider, useColorPickerSwatchContext] = createContext<
  ComputedRef<ColorSwatchProps>
>('ColorPickerSwatchContext')
