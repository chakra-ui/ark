import { Children, cloneElement, ReactElement } from 'react'
import { useEditableContext } from './editable-context'

export type EditableEditTriggerProps = { children: ReactElement }

export const EditableEditTrigger = (props: EditableEditTriggerProps) => {
  const { editTriggerProps } = useEditableContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, editTriggerProps)
}
