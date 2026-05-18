import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { splitPresenceProps } from './split-presence-props.ts'
import { type UsePresenceProps, usePresence } from './use-presence.ts'

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
      {...presence.getPresenceProps()}
      data-scope="presence"
      data-part="root"
      ref={composeRefs(presence.ref, ref)}
    />
  )
})

Presence.displayName = 'Presence'
