import { Presence, type PresenceProps } from '../presence'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPresenceProps = PresenceProps

export const HoverCardPresence = (props: HoverCardPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = useHoverCardContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
