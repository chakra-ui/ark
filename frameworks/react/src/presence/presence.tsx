import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { splitPresenceProps } from './split-presence-props'
import { usePresence, type UsePresenceProps } from './use-presence'

export interface PresenceProps extends Assign<HTMLArkProps<'div'>, UsePresenceProps> {}

export const Presence = forwardRef<HTMLDivElement, PresenceProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = usePresence(presenceProps)

  if (api.isUnmounted) {
    return null
  }

  return (
    <ark.div
      {...localProps}
      {...api.getPresenceProps(ref)}
      data-scope="presence"
      data-part="root"
    />
  )
})

Presence.displayName = 'Presence'
