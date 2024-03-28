import type { AreaProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export interface UseColorPickerAreaContext extends AreaProps {}

export const [ColorPickerAreaProvider, useColorPickerAreaContext] =
  createContext<UseColorPickerAreaContext>({
    hookName: 'useColorPickerAreaContext',
    providerName: '<ColorPickerAreaProvider />',
  })
