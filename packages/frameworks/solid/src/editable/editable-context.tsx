import type { JSX } from 'solid-js'
import { useEditableContext, type UseEditableContext } from './use-editable-context'

export interface EditableContextProps {
  children: (context: UseEditableContext) => JSX.Element
}

export const EditableContext = (props: EditableContextProps) => props.children(useEditableContext())
