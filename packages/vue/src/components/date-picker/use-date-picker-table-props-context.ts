import type { TableProps } from '@zag-js/date-picker'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface DatePickerTablePropsContext extends TableProps {}

export const [DatePickerTablePropsProvider, useDatePickerTablePropsContext] =
  createContext<ComputedRef<DatePickerTablePropsContext>>('DatePickerTablePropsContext')
