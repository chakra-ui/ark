import { createContext } from '$lib/utils/create-context'
import type { UseCheckboxGroupReturn } from './use-checkbox-group.svelte'

export interface UseCheckboxGroupContext extends UseCheckboxGroupReturn {}

export const [CheckboxGroupContextProvider, useCheckboxGroupContext] = createContext<UseCheckboxGroupContext>({
  name: 'CheckboxGroupContext',
  strict: false,
})
