import type { AreaProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export interface UseColorPickerAreaContext extends AreaProps {}

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<UseColorPickerAreaContext>({
    name: 'ColorPickerAreaContext',
    hookName: 'useColorPickerAreaContext',
    providerName: '<ColorPickerAreaProvider />',
  })
