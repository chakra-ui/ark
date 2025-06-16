import { createContext } from '$lib/utils/create-context'
import type { UseFieldReturn } from './use-field.svelte'

export interface UseFieldContext extends UseFieldReturn {}

export const [FieldProvider, useFieldContext] = createContext<UseFieldContext | undefined>({
  name: 'FieldContext',
  strict: false,
})
