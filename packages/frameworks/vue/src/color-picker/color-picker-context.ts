import { createContext } from '../context'
import { type UseColorPickerReturn } from './use-color-picker'

export type ColorPickerContext = UseColorPickerReturn

export const [ColorPickerProvider, useColorPickerContext] =
  createContext<ColorPickerContext>('ColorPickerContext')
