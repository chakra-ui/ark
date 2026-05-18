'use client'

import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from '../presence/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { splitPresenceProps } from '../presence/split-presence-props.ts'
import { type UseHoverCardProps, useHoverCard } from './use-hover-card.ts'
import { HoverCardProvider } from './use-hover-card-context.ts'

export interface HoverCardRootBaseProps extends UseHoverCardProps, UsePresenceProps {}
export interface HoverCardRootProps extends HoverCardRootBaseProps {
  children?: ReactNode | undefined
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
