import type { ColorAreaProps } from '@zag-js/color-picker'
import { createContext } from '../create-context'

export const [ColorPickerAreaProvider, useColorPickerAreaContext] = createContext<ColorAreaProps>({
  name: 'ColorPickerAreaContext',
  hookName: 'useColorPickerAreaContext',
  providerName: '<ColorPickerAreaProvider />',
})
