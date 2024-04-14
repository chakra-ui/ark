import { createContext } from '../../utils/create-context'
import type { UseCheckboxReturn } from './use-checkbox'

export interface UseCheckboxContext extends UseCheckboxReturn {}

export const [CheckboxProvider, useCheckboxContext] = createContext<UseCheckboxContext>({
  name: 'CheckboxContext',
  hookName: 'useCheckboxContext',
  providerName: '<CheckboxProvider />',
})
