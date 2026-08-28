import { createContext } from '$lib/utils/create-context'
import type { UseEditableReturn } from './use-editable.svelte.ts'

export interface UseEditableContext extends UseEditableReturn {}

export const [EditableProvider, useEditableContext] = createContext<UseEditableContext>({
  name: 'EditableContext',
})
