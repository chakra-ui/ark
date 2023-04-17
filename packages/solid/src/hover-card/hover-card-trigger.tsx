import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { ssrSpread } from '../ssr-spread'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardTriggerProps = { children: JSX.Element }

export const HoverCardTrigger = (props: HoverCardTriggerProps) => {
  const hoverCard = useHoverCardContext()
  const triggerProps = hoverCard().triggerProps

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren()
}
