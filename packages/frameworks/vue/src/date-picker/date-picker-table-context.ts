import type { TableProps } from '@zag-js/date-picker'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export interface DatePickerTableContext extends ComputedRef<TableProps> {}

export const [DatePickerTableProvider, useDatePickerTableContext] =
  createContext<DatePickerTableContext>('DatePickerTableContext')
