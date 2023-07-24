import { Presence, type PresenceProps } from '../presence'
import { useToastItemContext } from './toast-item-context'

export type ToastPresenceProps = PresenceProps

export const ToastPresence = (props: ToastPresenceProps) => {
  const { present, ...rest } = props
  const { isVisible } = useToastItemContext()

  return <Presence present={present !== undefined ? present : isVisible} {...rest} />
}
