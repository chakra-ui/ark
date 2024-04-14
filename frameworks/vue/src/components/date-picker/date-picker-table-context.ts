import type { TableProps } from '@zag-js/date-picker'
import { createContext } from '~/utils/context'

export interface DatePickerTableContext extends TableProps {}

export const [DatePickerTableProvider, useDatePickerTableContext] =
  createContext<DatePickerTableContext>('DatePickerTableContext')
