import type { ItemState } from '@zag-js/radio-group'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context.ts'

export interface UseRadioGroupItemContext extends Accessor<ItemState> {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] = createContext<UseRadioGroupItemContext>({
  hookName: 'useRadioGroupItemContext',
  providerName: '<RadioGroupItemProvider />',
})
