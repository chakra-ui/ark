import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useEditableContext } from './editable-context'

export type EditableEditTriggerProps = { children: JSX.Element }

export const EditableEditTrigger = (props: EditableEditTriggerProps) => {
  const dialog = useEditableContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, dialog().editTriggerProps)
    }
  })

  return <>{getChildren()}</>
}
