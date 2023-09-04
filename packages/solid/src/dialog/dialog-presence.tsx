import { Presence, type PresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'

export type DialogPresenceProps = PresenceProps

export const DialogPresence = (props: DialogPresenceProps) => {
  const api = useDialogContext()

  return <Presence present={api().isOpen} {...props} />
}
