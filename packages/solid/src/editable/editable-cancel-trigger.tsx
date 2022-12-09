import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useEditableContext } from './editable-context'

export type EditableCancelTriggerProps = { children: JSX.Element }

export const EditableCancelTrigger = (props: EditableCancelTriggerProps) => {
  const dialog = useEditableContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, dialog().cancelButtonProps)
    }
  })

  return <>{getChildren()}</>
}
