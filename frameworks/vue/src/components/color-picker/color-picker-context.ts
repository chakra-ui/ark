import { createContext } from '~/utils/context'
import type { UseColorPickerReturn } from './use-color-picker'

export interface ColorPickerContext extends UseColorPickerReturn {}

export const [ColorPickerProvider, useColorPickerContext] =
  createContext<ColorPickerContext>('ColorPickerContext')
