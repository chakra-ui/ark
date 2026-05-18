import { createContext } from '$lib/utils/create-context'
import type { UseColorPickerReturn } from './use-color-picker.svelte.ts'

export interface UseColorPickerContext extends UseColorPickerReturn {}

export const [ColorPickerProvider, useColorPickerContext] = createContext<UseColorPickerContext>({
  name: 'ColorPickerContext',
  hookName: 'useColorPickerContext',
  providerName: '<ColorPickerProvider />',
})
