import { createContext } from '../../utils'
import type { UseColorPickerReturn } from './use-color-picker'

export interface UseColorPickerContext extends UseColorPickerReturn {}

export const [ColorPickerProvider, useColorPickerContext] =
  createContext<UseColorPickerContext>('ColorPickerContext')
