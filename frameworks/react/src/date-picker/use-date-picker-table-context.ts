import type { TableProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export interface UseDatePickerTableContext extends TableProps {}

export const [DatePickerTableProvider, useDatePickerTableContext] =
  createContext<UseDatePickerTableContext>({
    name: 'DatePickerTableContext',
    hookName: 'useDatePickerTableContext',
    providerName: '<DatePickerTableProvider />',
  })
