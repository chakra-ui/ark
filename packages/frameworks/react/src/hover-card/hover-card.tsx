import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { HoverCardProvider, type HoverCardContext } from './hover-card-context'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'

export type HoverCardProps = Assign<
  UseHoverCardProps,
  {
    children?: ReactNode | ((props: HoverCardContext) => ReactNode)
  }
>

export const HoverCard = (props: HoverCardProps) => {
  const { children, ...useHoverCardProps } = props
  const hoverCard = useHoverCard(useHoverCardProps)
  const view = runIfFn(children, hoverCard)

  return <HoverCardProvider value={hoverCard}>{view}</HoverCardProvider>
}
