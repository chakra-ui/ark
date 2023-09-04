import { Presence, type PresenceProps } from '../presence'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPresenceProps = PresenceProps

export const HoverCardPresence = (props: HoverCardPresenceProps) => {
  const api = useHoverCardContext()

  return <Presence present={api().isOpen} {...props} />
}
