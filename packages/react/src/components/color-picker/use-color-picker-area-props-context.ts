import type { AreaProps } from '@zag-js/color-picker'
import { createContext } from '../../utils/create-context'

export interface UseColorPickerAreaPropsContext extends AreaProps {}

export const [ColorPickerAreaPropsProvider, useColorPickerAreaPropsContext] =
  createContext<UseColorPickerAreaPropsContext>({
    name: 'ColorPickerAreaContext',
    hookName: 'useColorPickerAreaContext',
    providerName: '<ColorPickerAreaProvider />',
  })
