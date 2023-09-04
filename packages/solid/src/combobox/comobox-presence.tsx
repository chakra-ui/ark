import { Presence, type PresenceProps } from '../presence'
import { useComboboxContext } from './combobox-context'

export type ComboboxPresenceProps = PresenceProps

export const ComboboxPresence = (props: ComboboxPresenceProps) => {
  const api = useComboboxContext()

  return <Presence present={api().isOpen} {...props} />
}
