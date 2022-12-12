import { Children, cloneElement, ReactElement } from 'react'
import { useEditableContext } from './editable-context'

export type EditableCancelTriggerProps = { children: ReactElement }

export const EditableCancelTrigger = (props: EditableCancelTriggerProps) => {
  const { cancelTriggerProps } = useEditableContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, cancelTriggerProps)
}
