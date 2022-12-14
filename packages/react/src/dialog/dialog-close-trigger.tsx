import { Children, cloneElement, ReactElement } from 'react'
import { useDialogContext } from './dialog-context'

export type DialogCloseTriggerProps = { children: ReactElement }

export const DialogCloseTrigger = (props: DialogCloseTriggerProps) => {
  const { closeTriggerProps } = useDialogContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, closeTriggerProps)
}
