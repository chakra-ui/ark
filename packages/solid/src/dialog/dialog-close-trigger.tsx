import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useDialogContext } from './dialog-context'

export type DialogCloseTriggerProps = { children: JSX.Element }

export const DialogCloseTrigger = (props: DialogCloseTriggerProps) => {
  const dialog = useDialogContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, dialog().closeButtonProps)
    }
  })

  return <>{getChildren()}</>
}
