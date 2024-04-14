import type { ViewProps } from '@zag-js/date-picker'
import { createContext } from '../../utils/context'

export interface DatePickerViewContext extends Required<ViewProps> {}

export const [DatePickerViewProvider, useDatePickerViewContext] =
  createContext<DatePickerViewContext>('DatePickerViewContext')
