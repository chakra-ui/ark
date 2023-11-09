import { createContext } from '../create-context'
import { type UseRadioGroupReturn } from './use-radio-group'

export interface RadioGroupContext extends UseRadioGroupReturn {}

export const [RadioGroupProvider, useRadioGroupContext] = createContext<RadioGroupContext>({
  hookName: 'useRadioGroupContext',
  providerName: '<RadioGroupProvider />',
})
