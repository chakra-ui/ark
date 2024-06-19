import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { splitPresenceProps } from './split-presence-props'
import { type UsePresenceProps, usePresence } from './use-presence'

export interface PresenceBaseProps extends UsePresenceProps, PolymorphicProps {}
export interface PresenceProps extends HTMLProps<'div'>, PresenceBaseProps {}

export const Presence = forwardRef<HTMLDivElement, PresenceProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const presence = usePresence(presenceProps)

  if (presence.unmounted) {
    return null
  }

  return (
    <ark.div
      {...localProps}
      {...presence.getPresenceProps(ref)}
      data-scope="presence"
      data-part="root"
    />
  )
})

Presence.displayName = 'Presence'
