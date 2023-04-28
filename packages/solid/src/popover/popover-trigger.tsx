import { children, createEffect, type JSX } from 'solid-js'
import { spread } from '../spread'
import { ssrSpread } from '../ssr-spread'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = { children: JSX.Element }

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const popover = usePopoverContext()

  const triggerProps = popover().triggerProps
  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren()
}
