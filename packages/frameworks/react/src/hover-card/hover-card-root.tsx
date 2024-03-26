import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

export interface HoverCardRootProps extends UseHoverCardProps, UsePresenceProps {
  children?: ReactNode
}

export const HoverCardRoot = (props: HoverCardRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const context = useHoverCard(localProps)
  const presenceApi = usePresence(mergeProps({ present: context.isOpen }, presenceProps))

  return (
    <HoverCardProvider value={context}>
      <PresenceProvider value={presenceApi}>{children}</PresenceProvider>
    </HoverCardProvider>
  )
}
