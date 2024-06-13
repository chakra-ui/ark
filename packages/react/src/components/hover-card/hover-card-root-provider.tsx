import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import type { UseHoverCardReturn } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

interface RootProviderProps {
  value: UseHoverCardReturn
}

export interface HoverCardRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {
  children?: ReactNode
}

export const HoverCardRootProvider = (props: HoverCardRootProviderProps) => {
  const [presenceProps, { value: hoverCard, children }] = splitPresenceProps(props)
  const presence = usePresence(mergeProps({ present: hoverCard.open }, presenceProps))

  return (
    <HoverCardProvider value={hoverCard}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </HoverCardProvider>
  )
}
