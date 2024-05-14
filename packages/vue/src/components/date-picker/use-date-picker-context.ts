import { createContext } from '../../utils'
import type { UseDatePickerReturn } from './use-date-picker'

export interface UseDatePickerContext extends UseDatePickerReturn {}

export const [DatePickerProvider, useDatePickerContext] =
  createContext<UseDatePickerContext>('DatePickerContext')
