import { createContext } from '../../utils/create-context'
import type { UseDatePickerReturn } from './use-date-picker'

export interface UseDatePickerContext extends UseDatePickerReturn {}

export const [DatePickerProvider, useDatePickerContext] = createContext<UseDatePickerContext>({
  name: 'DatePickerContext',
  hookName: 'useDatePickerContext',
  providerName: '<DatePickerProvider />',
})
