import type { DayCellProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export interface DatePickerDayCellContext extends DayCellProps {}

export const [DatePickerDayCellProvider, useDatePickerDayCellContext] =
  createContext<DatePickerDayCellContext>({
    name: 'DatePickerDayCellContext',
    hookName: 'useDatePickerDayCellContext',
    providerName: '<DatePickerDayCellProvider />',
  })
