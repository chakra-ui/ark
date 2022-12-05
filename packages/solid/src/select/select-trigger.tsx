import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useSelectContext } from './select-context'

export type SelectTriggerProps = { children: JSX.Element }

export const SelectTrigger = (props: SelectTriggerProps) => {
  const select = useSelectContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, select().triggerProps)
    }
  })

  return <>{getChildren()}</>
}
