import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = { children: JSX.Element }

export const DialogTrigger = (props: DialogTriggerProps) => {
  const dialog = useDialogContext()

  const triggerProps = dialog().triggerProps
  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren()
}
