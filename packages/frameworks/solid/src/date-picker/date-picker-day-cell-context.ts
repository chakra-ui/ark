import type { DayCellProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export type DatePickerDayCellContext = DayCellProps

export const [DatePickerDayCellProvider, useDatePickerDayCellContext] =
  createContext<DatePickerDayCellContext>({
    hookName: 'useDatePickerDayCellContext',
    providerName: '<DatePickerDayCellProvider />',
  })
