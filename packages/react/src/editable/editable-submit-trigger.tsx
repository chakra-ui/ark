import { Children, cloneElement, type ReactElement } from 'react'
import { useEditableContext } from './editable-context'

export type EditableSubmitTriggerProps = { children: ReactElement }

export const EditableSubmitTrigger = (props: EditableSubmitTriggerProps) => {
  const { submitTriggerProps } = useEditableContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, submitTriggerProps)
}
