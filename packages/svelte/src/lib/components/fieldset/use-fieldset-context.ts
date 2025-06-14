import { createContext } from '$lib/utils/create-context'
import type { UseFieldsetReturn } from './use-fieldset.svelte'

export interface UseFieldsetContext extends UseFieldsetReturn {}

export const [FieldsetProvider, useFieldsetContext] = createContext<UseFieldsetContext>({
  name: 'FieldsetContext',
  strict: false,
})
