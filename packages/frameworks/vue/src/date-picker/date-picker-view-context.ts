import type { ViewProps } from '@zag-js/date-picker'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export interface DatePickerViewContext extends ComputedRef<Required<ViewProps>> {}

export const [DatePickerViewProvider, useDatePickerViewContext] =
  createContext<DatePickerViewContext>('DatePickerViewContext')
