import type { Accessor } from '$lib/types.js'
import type { ViewProps } from '@zag-js/date-picker'
import { createContext } from '../../utils/create-context.js'

export interface UseDatePickerViewPropsContext extends Accessor<ViewProps> {}

export const [DatePickerViewPropsProvider, useDatePickerViewPropsContext] =
  createContext<UseDatePickerViewPropsContext>({
    name: 'DatePickerViewPropsContext',
    hookName: 'useDatePickerViewPropsContext',
    providerName: '<DatePickerViewPropsProvider />',
  })
