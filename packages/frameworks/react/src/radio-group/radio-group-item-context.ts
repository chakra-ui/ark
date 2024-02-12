import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../create-context'

export interface RadioGroupItemContext extends ItemProps {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>({
    name: 'RadioGroupItemContext',
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })
