import { createContext } from '../../utils/create-context.ts'
import type { UseCheckboxReturn } from './use-checkbox.ts'

export interface UseCheckboxContext extends UseCheckboxReturn {}

export const [CheckboxProvider, useCheckboxContext] = createContext<UseCheckboxContext>({
  hookName: 'useCheckboxContext',
  providerName: '<CheckboxProvider />',
})
