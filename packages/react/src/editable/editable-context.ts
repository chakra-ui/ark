import { createContext } from '../createContext'
import type { UseEditableReturn } from './use-editable'

export type EditableContext = UseEditableReturn['api']

export const [EditableProvider, useEditableContext] = createContext<EditableContext>({
  name: 'EditableContext',
  hookName: 'useEditableContext',
  providerName: '<EditableProvider />',
})
