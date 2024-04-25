import type { DateValue, DayTableCellProps, TableCellProps } from '@zag-js/date-picker'
import { createContext } from '../../utils'

export interface DatePickerTableCellPropsContext
  extends Omit<TableCellProps, 'value'>,
    Omit<DayTableCellProps, 'value'> {
  value: number | DateValue
}

export const [DatePickerTableCellPropsProvider, useDatePickerTableCellPropsContext] =
  createContext<DatePickerTableCellPropsContext>('DatePickerTableCellPropsContext')
