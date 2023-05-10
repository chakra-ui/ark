import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseTriggerProps = { children: JSX.Element }

export const ToastCloseTrigger = (props: ToastCloseTriggerProps) => {
  const toast = useToastItemContext()
  const triggerProps = toast().closeTriggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren()
}
