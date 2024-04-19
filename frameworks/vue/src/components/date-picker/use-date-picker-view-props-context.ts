import type { ViewProps } from '@zag-js/date-picker'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface DatePickerViewPropsContext extends Ref<Required<ViewProps>> {}

export const [DatePickerViewPropsProvider, useDatePickerViewPropsContext] =
  createContext<DatePickerViewPropsContext>('DatePickerViewPropsContext')
