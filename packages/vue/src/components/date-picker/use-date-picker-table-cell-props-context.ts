import type { DateValue, DayTableCellProps, TableCellProps } from '@zag-js/date-picker'
import type { Reactive } from 'vue'
import { createContext } from '../../utils'

export interface DatePickerTableCellPropsContext
  extends Omit<TableCellProps, 'value'>,
    Omit<DayTableCellProps, 'value'> {
  value: Reactive<number | DateValue>
}

export const [DatePickerTableCellPropsProvider, useDatePickerTableCellPropsContext] =
  createContext<DatePickerTableCellPropsContext>('DatePickerTableCellPropsContext')
