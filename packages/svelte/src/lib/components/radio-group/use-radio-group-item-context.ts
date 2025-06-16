import type { Accessor } from '$lib/types'
import type { ItemState } from '@zag-js/radio-group'
import { createContext } from '../../utils/create-context'

export interface UseRadioGroupItemContext extends Accessor<ItemState> {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] = createContext<UseRadioGroupItemContext>({
  name: 'RadioGroupItemContext',
  hookName: 'useRadioGroupItemContext',
  providerName: '<RadioGroupItemProvider />',
})
