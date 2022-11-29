import { createContext } from '../createContext'
import type { UseEditableReturn } from './use-editable'

export type EditableContext = UseEditableReturn

export const [EditableProvider, useEditableContext] = createContext<EditableContext>({
  hookName: 'useEditableContext',
  providerName: '<EditableProvider />',
})
