import type { DayTableCellProps, TableCellProps } from '@zag-js/date-picker'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

type Union<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] | T[K] : T[K]
} & Omit<U, keyof T>

type CellProps = Union<DayTableCellProps, TableCellProps>

export interface DatePickerTableCellContext extends ComputedRef<CellProps> {}

export const [DatePickerTableCellProvider, useDatePickerTableCellContext] =
  createContext<DatePickerTableCellContext>('DatePickerTableCellContext')
