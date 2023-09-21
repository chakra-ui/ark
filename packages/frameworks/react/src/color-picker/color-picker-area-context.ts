import type { ColorAreaProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export interface ColorPickerAreaContext extends ColorAreaProps {}

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<ColorPickerAreaContext>({
    name: 'ColorPickerAreaContext',
    hookName: 'useColorPickerAreaContext',
    providerName: '<ColorPickerAreaProvider />',
  })
