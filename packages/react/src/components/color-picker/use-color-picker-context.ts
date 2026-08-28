'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseColorPickerReturn } from './use-color-picker.ts'

export interface UseColorPickerContext extends UseColorPickerReturn {}

export const [ColorPickerProvider, useColorPickerContext] = createContext<UseColorPickerContext>({
  name: 'ColorPickerContext',
  hookName: 'useColorPickerContext',
  providerName: '<ColorPickerProvider />',
})
