import { Children, cloneElement, ReactElement } from 'react'
import { useEditableContext } from './editable-context'

export type EditableSubmitTriggerProps = { children: ReactElement }

export const EditableSubmitTrigger = (props: EditableSubmitTriggerProps) => {
  const { submitButtonProps } = useEditableContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, submitButtonProps)
}
