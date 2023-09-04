import { Presence, type PresenceProps } from '../presence'
import { useTooltipContext } from './tooltip-context'

export type TooltipPresenceProps = PresenceProps

export const TooltipPresence = (props: TooltipPresenceProps) => {
  const api = useTooltipContext()
  return <Presence present={api().isOpen} {...props} />
}
