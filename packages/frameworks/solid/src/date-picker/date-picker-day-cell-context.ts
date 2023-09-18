import type { DayCellProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export const [DatePickerDayCellProvider, useDatePickerDayCellContext] = createContext<DayCellProps>(
  {
    hookName: 'useDatePickerDayCellContext',
    providerName: '<DatePickerDayCellProvider />',
  },
)
