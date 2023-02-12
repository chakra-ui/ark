import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useComboboxContext } from './combobox-context'

export type ComboboxTriggerProps = { children: JSX.Element }

export const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const combobox = useComboboxContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, { ...combobox().triggerProps })
    }
  })

  return <>{getChildren()}</>
}
