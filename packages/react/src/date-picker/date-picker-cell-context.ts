import type { CellProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export const [DatePickerCellProvider, useDatePickerCellContext] = createContext<CellProps>({
  name: 'DatePickerCellContext',
  hookName: 'useDatePickerCellContext',
  providerName: '<DatePickerCellProvider />',
})
