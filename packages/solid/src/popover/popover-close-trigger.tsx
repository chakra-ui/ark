import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { usePopoverContext } from './popover-context'

export type PopoverCloseTriggerProps = { children: JSX.Element }

export const PopoverCloseTrigger = (props: PopoverCloseTriggerProps) => {
  const popover = usePopoverContext()
  const triggerProps = popover().closeTriggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren
}
