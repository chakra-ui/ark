import { Presence, type PresenceProps } from '../presence'
import type { Optional } from '../types'
import { useDialogContext } from './dialog-context'

export type DialogPresenceProps = Optional<PresenceProps, 'present'>

export const DialogPresence = (props: DialogPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = useDialogContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
