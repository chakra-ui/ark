import type { AreaProps } from '@zag-js/color-picker/dist/color-picker.types'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<ComputedRef<AreaProps>>('ColorPickerAreaContext')
