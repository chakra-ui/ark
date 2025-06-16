import type { Accessor } from '$lib/types.js'
import type { DayTableCellProps, TableCellProps } from '@zag-js/date-picker'
import { createContext } from '../../utils/create-context.js'

type Union<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] | T[K] : T[K]
} & Omit<U, keyof T>

type CellProps = Union<DayTableCellProps, TableCellProps>

export interface UseDatePickerTableCellPropsContext extends Accessor<CellProps> {}

export const [DatePickerTableCellPropsProvider, useDatePickerTableCellPropsContext] =
  createContext<UseDatePickerTableCellPropsContext>({
    name: 'DatePickerTableCellPropsContext',
    hookName: 'useDatePickerTableCellPropsContext',
    providerName: '<DatePickerTableCellPropsProvider />',
  })
