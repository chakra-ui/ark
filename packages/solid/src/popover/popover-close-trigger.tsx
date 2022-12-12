import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { usePopoverContext } from './popover-context'

export type PopoverCloseTriggerProps = { children: JSX.Element }

export const PopoverCloseTrigger = (props: PopoverCloseTriggerProps) => {
  const popover = usePopoverContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, popover().closeTriggerProps)
    }
  })

  return <>{getChildren()}</>
}
