import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { splitPresenceProps } from './split-presence-props'
import { type UsePresenceProps, usePresence } from './use-presence'

export interface PresenceBaseProps extends UsePresenceProps, PolymorphicProps {}
export interface PresenceProps extends HTMLProps<'div'>, PresenceBaseProps {}

export const Presence = ({ ref, ...props }: PresenceProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const presence = usePresence(presenceProps)

  if (presence.unmounted) {
    return null
  }

  return (
    <ark.div
      {...localProps}
      {...presence.getPresenceProps()}
      data-scope="presence"
      data-part="root"
      ref={composeRefs(presence.ref, ref)}
    />
  )
}

Presence.displayName = 'Presence'
