import { Presence, type PresenceProps } from '../presence'
import { usePopoverContext } from './popover-context'

export type PopoverPresenceProps = PresenceProps

export const PopoverPresence = (props: PopoverPresenceProps) => {
  const api = usePopoverContext()
  return <Presence present={api().isOpen} {...props} />
}
