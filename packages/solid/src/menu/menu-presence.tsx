import { Presence, type PresenceProps } from '../presence'
import { useMenuContext } from './menu-context'

export type MenuPresenceProps = PresenceProps

export const MenuPresence = (props: MenuPresenceProps) => {
  const api = useMenuContext()

  return <Presence present={api?.().isOpen} {...props} />
}
