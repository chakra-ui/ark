import type { SwatchProps } from '@zag-js/color-picker'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface ColorPickerSwatchPropsContext extends Ref<SwatchProps> {}

export const [ColorPickerSwatchPropsProvider, useColorPickerSwatchPropsContext] =
  createContext<ColorPickerSwatchPropsContext>('ColorPickerSwatchPropsContext')
