import type { DayCellProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export const [DatePickerDayCellProvider, useDatePickerDayCellContext] = createContext<DayCellProps>(
  {
    name: 'DatePickerDayCellContext',
    hookName: 'useDatePickerDayCellContext',
    providerName: '<DatePickerDayCellProvider />',
  },
)
