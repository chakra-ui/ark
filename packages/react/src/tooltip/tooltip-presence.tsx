import { Presence, type PresenceProps } from '../presence'
import { useTooltipContext } from './tooltip-context'

export type TooltipPresenceProps = PresenceProps

export const TooltipPresence = (props: TooltipPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = useTooltipContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
