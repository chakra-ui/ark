import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { type UseHoverCardProps, useHoverCard } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

export interface HoverCardRootProps extends UseHoverCardProps, UsePresenceProps {
  children?: ReactNode
}

export const HoverCardRoot = (props: HoverCardRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const hoverCard = useHoverCard(localProps)
  const presence = usePresence(mergeProps({ present: hoverCard.open }, presenceProps))

  return (
    <HoverCardProvider value={hoverCard}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </HoverCardProvider>
  )
}
