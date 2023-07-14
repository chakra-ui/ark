import { Presence, type PresenceProps } from '../presence'
import type { Optional } from '../types'
import { useTooltipContext } from './tooltip-context'

export type TooltipPresenceProps = Optional<PresenceProps, 'present'>

export const TooltipPresence = (props: TooltipPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = useTooltipContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
