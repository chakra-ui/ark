import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = { children: JSX.Element }

export const DialogTrigger = (props: DialogTriggerProps) => {
  const dialog = useDialogContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, dialog().triggerProps)
    }
  })

  return <>{getChildren()}</>
}
