import { Children, cloneElement, ReactElement } from 'react'
import { useEditableContext } from './editable-context'

export type EditableCancelTriggerProps = { children: ReactElement }

export const EditableCancelTrigger = (props: EditableCancelTriggerProps) => {
  const { cancelButtonProps } = useEditableContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, cancelButtonProps)
}
