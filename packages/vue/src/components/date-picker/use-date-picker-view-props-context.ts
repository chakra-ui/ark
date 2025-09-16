import type { ViewProps } from '@zag-js/date-picker'
import { createContext } from '../../utils/create-context'

export interface DatePickerViewPropsContext extends Required<ViewProps> {}

export const [DatePickerViewPropsProvider, useDatePickerViewPropsContext] =
  createContext<DatePickerViewPropsContext>('DatePickerViewPropsContext')
