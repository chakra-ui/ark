import type { SwatchProps } from '@zag-js/color-picker'
import { createContext } from '../../utils/create-context.ts'

export interface ColorPickerSwatchPropsContext extends SwatchProps {}

export const [ColorPickerSwatchPropsProvider, useColorPickerSwatchPropsContext] =
  createContext<ColorPickerSwatchPropsContext>('ColorPickerSwatchPropsContext')
