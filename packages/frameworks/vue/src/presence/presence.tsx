import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { presenceProps } from './presence.props'
import { usePresence, type UsePresenceProps } from './use-presence'

export interface PresenceProps extends Assign<HTMLArkProps<'div'>, UsePresenceProps> {}

export const Presence = defineComponent<PresenceProps>(
  (props, { slots, attrs, emit }) => {
    const api = usePresence(props, emit)

    return () =>
      api.value.isUnmounted ? null : (
        <ark.div {...attrs} {...api.value.presenceProps} data-scope="presence" data-part="root">
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'Presence',
    props: presenceProps,
  },
)
