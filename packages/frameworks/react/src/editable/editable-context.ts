import { createContext } from '../create-context'
import { type UseEditableReturn } from './use-editable'

export type EditableContext = UseEditableReturn

export const [EditableProvider, useEditableContext] = createContext<EditableContext>({
  name: 'EditableContext',
  hookName: 'useEditableContext',
  providerName: '<EditableProvider />',
})
