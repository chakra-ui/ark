import { Presence, type PresenceProps } from '../presence'
import { useSelectContext } from './select-context'

export type SelectPresenceProps = PresenceProps

export const SelectPresence = (props: SelectPresenceProps) => {
  const { present, ...rest } = props
  const { isOpen } = useSelectContext()

  return <Presence present={present !== undefined ? present : isOpen} {...rest} />
}
