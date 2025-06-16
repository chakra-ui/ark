import type { Accessor } from '$lib/types.js'
import type { TableProps } from '@zag-js/date-picker'
import { createContext } from '../../utils/create-context.js'

export interface UseDatePickerTablePropsContext extends Accessor<TableProps> {}

export const [DatePickerTablePropsProvider, useDatePickerTablePropsContext] =
  createContext<UseDatePickerTablePropsContext>({
    name: 'DatePickerTablePropsContext',
    hookName: 'useDatePickerTablePropsContext',
    providerName: '<DatePickerTablePropsProvider />',
  })
