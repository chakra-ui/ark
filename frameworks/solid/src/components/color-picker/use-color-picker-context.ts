import { createContext } from '~/utils/create-context'
import type { UseColorPickerReturn } from './use-color-picker'

export interface UseColorPickerContext extends UseColorPickerReturn {}

export const [ColorPickerProvider, useColorPickerContext] = createContext<UseColorPickerContext>({
  hookName: 'useColorPickerContext',
  providerName: '<ColorPickerProvider />',
})
