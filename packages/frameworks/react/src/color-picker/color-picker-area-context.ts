import type { AreaProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export interface ColorPickerAreaContext extends AreaProps {}

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<ColorPickerAreaContext>({
    name: 'ColorPickerAreaContext',
    hookName: 'useColorPickerAreaContext',
    providerName: '<ColorPickerAreaProvider />',
  })
