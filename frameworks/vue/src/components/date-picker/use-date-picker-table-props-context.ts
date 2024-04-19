import type { TableProps } from '@zag-js/date-picker'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface DatePickerTablePropsContext extends Ref<TableProps> {}

export const [DatePickerTablePropsProvider, useDatePickerTablePropsContext] =
  createContext<DatePickerTablePropsContext>('DatePickerTablePropsContext')
