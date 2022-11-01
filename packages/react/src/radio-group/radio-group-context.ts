import { createContext } from '../createContext'
import type { UseRadioGroupReturn } from './use-radio-group'

export type RadioGroupContext = UseRadioGroupReturn

export const [RadioGroupProvider, useRadioGroupContext] = createContext<RadioGroupContext>({
  name: 'RadioGroupContext',
  hookName: 'useRadioGroupContext',
  providerName: '<RadioGroupProvider />',
})
