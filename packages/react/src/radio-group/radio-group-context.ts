import { createContext } from '../createContext'
import { UseRadioGroupReturn } from './use-radio-group'

export type RadioGroupContext = UseRadioGroupReturn['api']

export const [RadioGroupProvider, useRadioGroupContext] = createContext<RadioGroupContext>({
  name: 'RadioGroupContext',
  hookName: 'useRadioGroupContext',
  providerName: '<RadioGroupProvider />',
})
