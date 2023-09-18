import { type ContentProps } from '@zag-js/tabs'
import { Presence, type PresenceProps } from '../presence'
import { useTabsContext } from './tabs-context'

export type TabPresenceProps = PresenceProps & ContentProps

export const TabPresence = (props: TabPresenceProps) => {
  const { present, ...rest } = props
  const { value } = useTabsContext()

  return <Presence present={present !== undefined ? present : value === props.value} {...rest} />
}
