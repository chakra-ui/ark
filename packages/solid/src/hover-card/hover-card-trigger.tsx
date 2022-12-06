import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardTriggerProps = { children: JSX.Element }

export const HoverCardTrigger = (props: HoverCardTriggerProps) => {
  const hoverCard = useHoverCardContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, hoverCard().triggerProps)
    }
  })

  return <>{getChildren()}</>
}
