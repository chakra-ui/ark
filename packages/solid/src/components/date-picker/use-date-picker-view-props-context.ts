import type { ViewProps } from '@zag-js/date-picker'
import { createContext } from '../../utils/create-context'

export interface UseDatePickerViewContext extends Required<ViewProps> {}

export const [DatePickerViewProvider, useDatePickerViewContext] =
  createContext<UseDatePickerViewContext>({
    hookName: 'useDatePickerViewContext',
    providerName: '<DatePickerViewProvider />',
    strict: false,
    defaultValue: { view: 'day' },
  })
