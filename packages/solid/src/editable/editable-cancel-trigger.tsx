import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useEditableContext } from './editable-context'

export type EditableCancelTriggerProps = { children: JSX.Element }

export const EditableCancelTrigger = (props: EditableCancelTriggerProps) => {
  const dialog = useEditableContext()
  const triggerProps = dialog().cancelTriggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren
}
