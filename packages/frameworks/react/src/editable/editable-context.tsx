import { useEditableContext, type UseEditableContext } from './use-editable-context'

export interface EditableContextProps {
  children: (context: UseEditableContext) => React.ReactNode
}

export const EditableContext = (props: EditableContextProps) => props.children(useEditableContext())
