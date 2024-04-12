import { createContext } from '../create-context'
import type { UseRadioGroupReturn } from './use-radio-group'

export interface UseRadioGroupContext extends UseRadioGroupReturn {}

export const [RadioGroupProvider, useRadioGroupContext] = createContext<UseRadioGroupContext>({
  hookName: 'useRadioGroupContext',
  providerName: '<RadioGroupProvider />',
})
