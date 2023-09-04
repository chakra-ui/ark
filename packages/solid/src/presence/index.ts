import { Presence as PresenceRoot, type PresenceProps } from './presence'
import { splitPresenceProps } from './split-presence-props'

const Presence = Object.assign(PresenceRoot, {
  Root: PresenceRoot,
})

export { Presence, splitPresenceProps }
export type { PresenceProps }
