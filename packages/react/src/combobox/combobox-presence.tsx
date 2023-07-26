import { Presence, type PresenceProps } from '../presence'
import { useComboboxContext } from './combobox-context'

export type ComboboxPresenceProps = PresenceProps

export const ComboboxPresence = (props: ComboboxPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = useComboboxContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
