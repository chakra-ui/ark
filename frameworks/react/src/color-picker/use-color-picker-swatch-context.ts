import type { SwatchProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export interface UseColorPickerSwatchContext extends SwatchProps {}

export const [ColorPickerSwatchProvider, useColorPickerSwatchContext] =
  createContext<UseColorPickerSwatchContext>({
    name: 'ColorPickerSwatchContext',
    hookName: 'useColorPickerSwatchContext',
    providerName: '<ColorPickerSwatchProvider />',
  })
