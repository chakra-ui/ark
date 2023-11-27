import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../create-context'

export interface RadioGroupItemContext extends ItemProps {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>({
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })
