import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { runIfFn } from '../run-if-fn'
import { HoverCardProvider } from './hover-card-context'
import { useHoverCard, type UseHoverCardProps, type UseHoverCardReturn } from './use-hover-card'

export interface HoverCardProps extends UseHoverCardProps, UsePresenceProps {
  children?: ReactNode | ((api: UseHoverCardReturn) => ReactNode)
}

export const HoverCard = (props: HoverCardProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const api = useHoverCard(localProps)
  const presenceApi = usePresence(mergeProps({ present: api.isOpen }, presenceProps))
  const view = runIfFn(children, api)

  return (
    <HoverCardProvider value={api}>
      <PresenceProvider value={presenceApi}>{view}</PresenceProvider>
    </HoverCardProvider>
  )
}
