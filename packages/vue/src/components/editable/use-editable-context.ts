import { createContext } from '../../utils'
import type { UseEditableReturn } from './use-editable'

export interface UseEditableContext extends UseEditableReturn {}

export const [EditableProvider, useEditableContext] =
  createContext<UseEditableContext>('EditableContext')
