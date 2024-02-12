import type { ViewProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export interface DatePickerViewContext extends Required<ViewProps> {}

export const [DatePickerViewProvider, useDatePickerViewContext] =
  createContext<DatePickerViewContext>({
    name: 'DatePickerViewContext',
    hookName: 'useDatePickerViewContext',
    providerName: '<DatePickerViewProvider />',
  })
