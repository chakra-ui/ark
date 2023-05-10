import { createContext } from '../create-context'
import { type UseDatePickerReturn } from './use-date-picker'

export type DatePickerContext = UseDatePickerReturn

export const [DatePickerProvider, useDatePickerContext] = createContext<DatePickerContext>({
  name: 'DatePickerContext',
  hookName: 'useDatePickerContext',
  providerName: '<DatePickerProvider />',
})
