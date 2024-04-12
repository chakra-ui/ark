import { createContext } from '../context'
import type { UseDatePickerReturn } from './use-date-picker'

export interface DatePickerContext extends UseDatePickerReturn {}

export const [DatePickerProvider, useDatePickerContext] =
  createContext<DatePickerContext>('DatePickerContext')
