import { Children, cloneElement, ReactElement } from 'react'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseTriggerProps = { children: ReactElement }

export const ToastCloseTrigger = (props: ToastCloseTriggerProps) => {
  const { closeTriggerProps } = useToastItemContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, closeTriggerProps)
}
