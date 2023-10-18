import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../create-context'

export type RadioGroupItemContext = ItemProps

export const [RadioProvider, useRadioGroupItemContext] = createContext<RadioGroupItemContext>({
  hookName: 'useRadioGroupItemContext',
  providerName: '<RadioProvider />',
})
