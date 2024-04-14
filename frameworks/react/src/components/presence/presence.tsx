import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { splitPresenceProps } from './split-presence-props'
import { type UsePresenceProps, usePresence } from './use-presence'

export interface PresenceProps extends Assign<HTMLArkProps<'div'>, UsePresenceProps> {}

export const Presence = forwardRef<HTMLDivElement, PresenceProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const presence = usePresence(presenceProps)

  if (presence.isUnmounted) {
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
