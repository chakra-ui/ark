import { createContext } from '../create-context'
import { type UseCheckboxReturn } from './use-checkbox'

export interface UseCheckboxContext extends UseCheckboxReturn {}

export const [CheckboxProvider, useCheckboxContext] = createContext<UseCheckboxContext>({
  hookName: 'useCheckboxContext',
  providerName: '<CheckboxProvider />',
})
