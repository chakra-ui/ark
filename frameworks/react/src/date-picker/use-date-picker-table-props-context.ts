import type { TableProps } from '@zag-js/date-picker'
import { createContext } from '../create-context'

export interface UseDatePickerTablePropsContext extends TableProps {}

export const [DatePickerTablePropsProvider, useDatePickerTablePropsContext] =
  createContext<UseDatePickerTablePropsContext>({
    name: 'DatePickerTableContext',
    hookName: 'useDatePickerTableContext',
    providerName: '<DatePickerTableProvider />',
  })
