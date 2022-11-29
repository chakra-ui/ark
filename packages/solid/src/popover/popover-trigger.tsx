import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = { children: JSX.Element }

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const popover = usePopoverContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, popover().triggerProps)
    }
  })

  return <>{getChildren()}</>
}
