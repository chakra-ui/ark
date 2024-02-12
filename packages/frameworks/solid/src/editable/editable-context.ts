import { createContext } from '../create-context'
import { type UseEditableReturn } from './use-editable'

export interface EditableContext extends UseEditableReturn {}

export const [EditableProvider, useEditableContext] = createContext<EditableContext>({
  hookName: 'useEditableContext',
  providerName: '<EditableProvider />',
})
