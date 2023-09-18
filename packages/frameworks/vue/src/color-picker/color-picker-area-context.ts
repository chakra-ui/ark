import type { ColorAreaProps } from '@zag-js/color-picker'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<ComputedRef<ColorAreaProps>>('ColorPickerAreaContext')
