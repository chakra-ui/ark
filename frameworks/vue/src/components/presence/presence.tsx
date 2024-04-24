import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { props } from './presence.props'
import { type UsePresenceProps, usePresence } from './use-presence'

export interface PresenceProps extends Assign<HTMLArkProps<'div'>, UsePresenceProps> {}

export const Presence = defineComponent<PresenceProps>(
  (props, { slots, attrs, emit }) => {
    const api = usePresence(props, emit)

    return () =>
      api.value.unmounted ? null : (
        <ark.div {...attrs} {...api.value.presenceProps} data-scope="presence" data-part="root">
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'Presence',
    props,
  },
)
