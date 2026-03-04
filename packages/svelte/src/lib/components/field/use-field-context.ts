import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { UseFieldReturn } from './use-field.svelte'

export type UseFieldApi = ReturnType<UseFieldReturn>
export type UseFieldContext = Accessor<UseFieldApi | undefined>

export const [FieldProvider, useFieldContext] = createContext<UseFieldContext | undefined>({
  name: 'FieldContext',
  strict: false,
})
