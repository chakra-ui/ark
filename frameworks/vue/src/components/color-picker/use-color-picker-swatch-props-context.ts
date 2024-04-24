import type { SwatchProps } from '@zag-js/color-picker'
import { createContext } from '../../utils'

export interface ColorPickerSwatchPropsContext extends SwatchProps {}

export const [ColorPickerSwatchPropsProvider, useColorPickerSwatchPropsContext] =
  createContext<ColorPickerSwatchPropsContext>('ColorPickerSwatchPropsContext')
