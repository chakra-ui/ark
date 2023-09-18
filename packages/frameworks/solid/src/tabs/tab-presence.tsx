import type { ContentProps } from '@zag-js/tabs'
import { Presence, type PresenceProps } from '../presence'
import { useTabsContext } from './tabs-context'

export type TabPresenceProps = PresenceProps & ContentProps

export const TabPresence = (props: TabPresenceProps) => {
  const api = useTabsContext()

  return <Presence present={api().value === props.value} {...props} />
}
