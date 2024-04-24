import type { DayTableCellProps, TableCellProps } from '@zag-js/date-picker'
import { createContext } from '../../utils'

type Union<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] | T[K] : T[K]
} & Omit<U, keyof T>

type CellProps = Union<DayTableCellProps, TableCellProps>

export interface DatePickerTableCellPropsContext extends CellProps {}

export const [DatePickerTableCellPropsProvider, useDatePickerTableCellPropsContext] =
  createContext<DatePickerTableCellPropsContext>('DatePickerTableCellPropsContext')
