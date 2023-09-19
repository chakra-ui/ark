import type { ColorSwatchProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export type ColorPickerSwatchContext = ColorSwatchProps

export const [ColorPickerSwatchProvider, useColorPickerSwatchContext] =
  createContext<ColorPickerSwatchContext>({
    hookName: 'useColorPickerSwatchContext',
    providerName: '<ColorPickerSwatchProvider />',
  })
