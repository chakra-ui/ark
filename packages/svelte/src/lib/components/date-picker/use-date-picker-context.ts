import type { Accessor } from '$lib/types.js'
import type * as datePicker from '@zag-js/date-picker'
import type { PropTypes } from '@zag-js/svelte'
import { createContext } from '../../utils/create-context.js'

export interface UseDatePickerContext extends Accessor<datePicker.Api<PropTypes>> {}

export const [DatePickerProvider, useDatePickerContext] = createContext<UseDatePickerContext>({
  name: 'DatePickerContext',
  hookName: 'useDatePickerContext',
  providerName: '<DatePickerProvider />',
})
