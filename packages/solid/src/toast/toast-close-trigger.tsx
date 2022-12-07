import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseTriggerProps = { children: JSX.Element }

export const ToastCloseTrigger = (props: ToastCloseTriggerProps) => {
  const toast = useToastItemContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, toast().closeButtonProps)
    }
  })

  return <>{getChildren()}</>
}
