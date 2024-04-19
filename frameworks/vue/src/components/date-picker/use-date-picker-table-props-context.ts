import type { TableProps } from '@zag-js/date-picker'
import { createContext } from '../../utils'

export interface DatePickerTablePropsContext extends TableProps {}

export const [DatePickerTablePropsProvider, useDatePickerTablePropsContext] =
  createContext<DatePickerTablePropsContext>('DatePickerTablePropsContext')
