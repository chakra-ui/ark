import { Presence, type PresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'

export type DialogPresenceProps = PresenceProps

export const DialogPresence = (props: DialogPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = useDialogContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
