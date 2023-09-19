import type { ColorAreaProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export type ColorPickerAreaContext = ColorAreaProps

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<ColorPickerAreaContext>({
    hookName: 'useColorPickerAreaContext',
    providerName: '<ColorPickerAreaProvider />',
  })
