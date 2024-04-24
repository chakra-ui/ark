import type { ReactNode } from 'react'
import { type UseEditableContext, useEditableContext } from './use-editable-context'

export interface EditableContextProps {
  children: (context: UseEditableContext) => ReactNode
}

export const EditableContext = (props: EditableContextProps) => props.children(useEditableContext())
