import { Presence as PresenceRoot, type PresenceProps } from './presence'
import { PresenceProvider, usePresenceContext, type PresenceContext } from './presence-context'
import { splitPresenceProps } from './split-presence-props'
import { usePresence, type UsePresenceProps, type UsePresenceReturn } from './use-presence'

const Presence = Object.assign(PresenceRoot, {
  Root: PresenceRoot,
})

export { Presence, PresenceProvider, splitPresenceProps, usePresence, usePresenceContext }

export type { PresenceContext, PresenceProps, UsePresenceProps, UsePresenceReturn }
