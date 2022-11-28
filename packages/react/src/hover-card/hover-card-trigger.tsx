import { Children, cloneElement, ReactElement } from 'react'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardTriggerProps = {
  children: ReactElement
}

export const HoverCardTrigger = (props: HoverCardTriggerProps) => {
  const { triggerProps } = useHoverCardContext()
  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, triggerProps)
}
