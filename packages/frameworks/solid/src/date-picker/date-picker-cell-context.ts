import type { CellProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export type DatePickerCellContext = CellProps

export const [DatePickerCellProvider, useDatePickerCellContext] =
  createContext<DatePickerCellContext>({
    hookName: 'useDatePickerCellContext',
    providerName: '<DatePickerCellProvider />',
  })
