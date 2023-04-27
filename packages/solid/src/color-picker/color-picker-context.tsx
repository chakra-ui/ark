import { createContext } from '../create-context'
import { type UseColorPickerReturn } from './use-color-picker'

export type ColorPickerContext = UseColorPickerReturn

export const [ColorPickerProvider, useColorPickerContext] = createContext<ColorPickerContext>({
  hookName: 'useColorPickerContext',
  providerName: '<ColorPickerProvider />',
})
