import { Presence, type PresenceProps } from '../presence'
import { useSelectContext } from './select-context'

export type SelectPresenceProps = PresenceProps

export const SelectPresence = (props: SelectPresenceProps) => {
  const api = useSelectContext()

  return <Presence present={api().isOpen} {...props} />
}
