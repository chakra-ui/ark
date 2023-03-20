import { createContext } from '../create-context'
import { type UseCheckboxReturn } from './use-checkbox'

export type CheckboxContext = UseCheckboxReturn

export const [CheckboxProvider, useCheckboxContext] = createContext<CheckboxContext>({
  name: 'CheckboxContext',
  hookName: 'useCheckboxContext',
  providerName: '<CheckboxProvider />',
})
