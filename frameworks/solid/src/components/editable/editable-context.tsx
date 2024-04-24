import type { JSX } from 'solid-js'
import { type UseEditableContext, useEditableContext } from './use-editable-context'

export interface EditableContextProps {
  children: (context: UseEditableContext) => JSX.Element
}

export const EditableContext = (props: EditableContextProps) => props.children(useEditableContext())
