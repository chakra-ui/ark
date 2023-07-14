import { Presence, type PresenceProps } from '../presence'
import type { Optional } from '../types'
import { usePopoverContext } from './popover-context'

export type PopoverPresenceProps = Optional<PresenceProps, 'present'>

export const PopoverPresence = (props: PopoverPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = usePopoverContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
