import type { Accessor } from '$lib/types.js'
import type * as dateInput from '@zag-js/date-input'
import type { PropTypes } from '@zag-js/svelte'
import { createContext } from '../../utils/create-context.js'

export interface UseDateInputContext extends Accessor<dateInput.Api<PropTypes>> {}

export const [DateInputProvider, useDateInputContext] = createContext<UseDateInputContext>({
  name: 'DateInputContext',
  hookName: 'useDateInputContext',
  providerName: '<DateInputProvider />',
})
