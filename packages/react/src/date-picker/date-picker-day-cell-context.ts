import type { DayCellProps } from '@zag-js/date-picker/dist/date-picker.types'
import { createContext } from '../create-context'

export const [DatePickerDayCellProvider, useDatePickerDayCellContext] = createContext<DayCellProps>(
  {
    name: 'DatePickerDayCellContext',
    hookName: 'useDatePickerDayCellContext',
    providerName: '<DatePickerDayCellProvider />',
  },
)
