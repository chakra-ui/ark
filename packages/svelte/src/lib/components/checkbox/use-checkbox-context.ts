import { createContext } from '$lib/utils/create-context'
import type { UseCheckboxReturn } from './use-checkbox.svelte'

export interface UseCheckboxContext extends UseCheckboxReturn {}
export const [CheckboxProvider, useCheckboxContext] = createContext<UseCheckboxContext>({
  key: 'CheckboxContext',
})
