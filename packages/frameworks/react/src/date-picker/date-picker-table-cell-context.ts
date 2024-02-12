import type { DayTableCellProps, TableCellProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

type Union<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] | T[K] : T[K]
} & Omit<U, keyof T>

type CellProps = Union<DayTableCellProps, TableCellProps>

export interface DatePickerTableCellContext extends CellProps {}

export const [DatePickerTableCellProvider, useDatePickerTableCellContext] =
  createContext<DatePickerTableCellContext>({
    name: 'DatePickerTableCellContext',
    hookName: 'useDatePickerTableCellContext',
    providerName: '<DatePickerTableCellProvider />',
  })
