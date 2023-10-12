import type { TableProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export interface DatePickerTableContext extends TableProps {}

export const [DatePickerTableProvider, useDatePickerTableContext] =
  createContext<DatePickerTableContext>({
    name: 'DatePickerTableContext',
    hookName: 'useDatePickerTableContext',
    providerName: '<DatePickerTableProvider />',
  })
