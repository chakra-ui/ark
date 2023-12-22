import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { emits } from './presence.props'
import { usePresence, type UsePresenceProps } from './use-presence'

export interface PresenceProps extends Assign<HTMLArkProps<'div'>, UsePresenceProps> {}

export const Presence = defineComponent({
  name: 'Presence',
  props: {
    present: {
      type: Boolean as PropType<UsePresenceProps['present']>,
      default: undefined,
    },
    lazyMount: {
      type: Boolean as PropType<UsePresenceProps['lazyMount']>,
      default: undefined,
    },
    unmountOnExit: {
      type: Boolean as PropType<UsePresenceProps['unmountOnExit']>,
      default: undefined,
    },
  },
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = usePresence(props, emit)

    return () =>
      api.value.isUnmounted ? null : (
        <ark.div {...attrs} {...api.value.presenceProps} data-scope="presence" data-part="root">
          {slots.default?.()}
        </ark.div>
      )
  },
})
