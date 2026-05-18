'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseDatePickerReturn } from './use-date-picker.ts'

export interface UseDatePickerContext extends UseDatePickerReturn {}

export const [DatePickerProvider, useDatePickerContext] = createContext<UseDatePickerContext>({
  name: 'DatePickerContext',
  hookName: 'useDatePickerContext',
  providerName: '<DatePickerProvider />',
})
