import type { ColorSwatchProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export interface ColorPickerSwatchContext extends ColorSwatchProps {}

export const [ColorPickerSwatchProvider, useColorPickerSwatchContext] =
  createContext<ColorPickerSwatchContext>({
    name: 'ColorPickerSwatchContext',
    hookName: 'useColorPickerSwatchContext',
    providerName: '<ColorPickerSwatchProvider />',
  })
