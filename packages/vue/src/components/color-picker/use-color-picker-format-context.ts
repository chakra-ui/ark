import type { ColorFormat } from '@zag-js/color-picker'
import { createContext } from '../../utils/create-context.ts'

export interface UseColorPickerSwatchPropsContext {
  format: ColorFormat
}

export const [ColorPickerFormatPropsProvider, useColorPickerFormatPropsContext] =
  createContext<UseColorPickerSwatchPropsContext>('ColorPickerFormatProps')
