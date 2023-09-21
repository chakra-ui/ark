import { type ContentProps } from '@zag-js/tabs'
import { Presence, type PresenceProps } from '../presence'
import { useTabsContext } from './tabs-context'

export interface TabPresenceProps extends PresenceProps, ContentProps {}

export const TabPresence = (props: TabPresenceProps) => {
  const { present, ...rest } = props
  const api = useTabsContext()

  return (
    <Presence present={present !== undefined ? present : api.value === props.value} {...rest} />
  )
}
