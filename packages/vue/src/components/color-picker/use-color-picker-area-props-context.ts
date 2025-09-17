import type { AreaProps } from '@zag-js/color-picker'
import { createContext } from '../../utils/create-context'

export interface ColorPickerAreaPropsContext extends AreaProps {}

export const [ColorPickerAreaPropsProvider, useColorPickerAreaPropsContext] =
  createContext<ColorPickerAreaPropsContext>('ColorPickerAreaPropsContext')
