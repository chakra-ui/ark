import type { PropsWithChildren } from 'react'
import { HoverCardProvider } from './hover-card-context'
import { useHoverCard, UseHoverCardProps } from './use-hover-card'

export type HoverCardProps = PropsWithChildren<UseHoverCardProps>

export const HoverCard = (props: HoverCardProps) => {
  const { children, ...useHoverCardProps } = props
  const hoverCard = useHoverCard(useHoverCardProps)

  return <HoverCardProvider value={hoverCard}>{children}</HoverCardProvider>
}
