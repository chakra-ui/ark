import { createContext } from '../create-context'
import { type UseCheckboxReturn } from './use-checkbox'

export interface CheckboxContext extends UseCheckboxReturn {}

export const [CheckboxProvider, useCheckboxContext] = createContext<CheckboxContext>({
  name: 'CheckboxContext',
  hookName: 'useCheckboxContext',
  providerName: '<CheckboxProvider />',
})
