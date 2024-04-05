import type { SwatchProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export interface UseColorPickerSwatchPropsContext extends SwatchProps {}

export const [ColorPickerSwatchPropsProvider, useColorPickerSwatchPropsContext] =
  createContext<UseColorPickerSwatchPropsContext>({
    name: 'ColorPickerSwatchContext',
    hookName: 'useColorPickerSwatchContext',
    providerName: '<ColorPickerSwatchProvider />',
  })
