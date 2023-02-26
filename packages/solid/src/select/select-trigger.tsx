import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useSelectContext } from './select-context'

export type SelectTriggerProps = { children: JSX.Element }

export const SelectTrigger = (props: SelectTriggerProps) => {
  const select = useSelectContext()
  const triggerProps = select().triggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren
}
