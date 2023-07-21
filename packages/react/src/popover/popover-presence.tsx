import { Presence, type PresenceProps } from '../presence'
import { usePopoverContext } from './popover-context'

export type PopoverPresenceProps = PresenceProps

export const PopoverPresence = (props: PopoverPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = usePopoverContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
