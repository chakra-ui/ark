import type { ViewProps } from '@zag-js/date-picker'
import { createContext } from '../../utils'

export interface DatePickerViewPropsContext extends Required<ViewProps> {}

export const [DatePickerViewPropsProvider, useDatePickerViewPropsContext] =
  createContext<DatePickerViewPropsContext>('DatePickerViewPropsContext', {
    strict: false,
    defaultValue: { view: 'day' },
  })
