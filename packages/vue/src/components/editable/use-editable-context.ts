import { createContext } from '../../utils/create-context.ts'
import type { UseEditableReturn } from './use-editable.ts'

export interface UseEditableContext extends UseEditableReturn {}

export const [EditableProvider, useEditableContext] = createContext<UseEditableContext>('EditableContext')
