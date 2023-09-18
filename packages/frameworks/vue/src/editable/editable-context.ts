import { createContext } from '../context'
import { type UseEditableReturn } from './use-editable'

export type EditableContext = UseEditableReturn

export const [EditableProvider, useEditableContext] =
  createContext<EditableContext>('EditableContext')
