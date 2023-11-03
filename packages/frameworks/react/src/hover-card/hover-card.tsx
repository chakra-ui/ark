import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { HoverCardProvider, type HoverCardContext } from './hover-card-context'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'

export interface HoverCardProps
  extends Assign<
      UseHoverCardProps,
      { children?: ReactNode | ((props: HoverCardContext) => ReactNode) }
    >,
    UsePresenceProps {}

export const HoverCard = (props: HoverCardProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const api = useHoverCard(localProps)
  const presenceApi = usePresence({ ...presenceProps, present: api.isOpen })
  const view = runIfFn(children, api)

  return (
    <HoverCardProvider value={api}>
      <PresenceProvider value={presenceApi}>{view}</PresenceProvider>
    </HoverCardProvider>
  )
}
