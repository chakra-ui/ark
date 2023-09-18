import { cloneVNode, defineComponent, ref, watch, withDirectives } from 'vue'
import { emits, props } from './presence.props'
import { usePresence, type UsePresenceProps } from './use-presence'

export type PresenceProps = UsePresenceProps & {
  /**
   * Whether to enable lazy mounting. Defaults to `false`.
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit. Defaults to `false`.
   */
  unmountOnExit?: boolean
}

export const Presence = defineComponent({
  props,
  emits,
  setup(props, { slots, emit }) {
    const api = usePresence(props, emit)
    const wasEverPresent = ref(false)

    watch(
      () => api.value.isPresent,
      (newValue) => {
        if (newValue) {
          wasEverPresent.value = true
        }
      },
    )

    const setRef = {
      mounted(el: HTMLElement) {
        api.value.setNode(el)
      },
    }

    return () => {
      const originalVNode = slots.default ? slots.default()[0] : null

      if (
        !originalVNode ||
        (!api.value.isPresent && !wasEverPresent.value && props.lazyMount) ||
        (props.unmountOnExit && !api.value.isPresent && wasEverPresent.value)
      ) {
        return null
      }

      const clonedVNode = cloneVNode(originalVNode, {
        ['data-state']: props.present ? 'open' : 'closed',
        ['hidden']: !api.value.isPresent,
      })
      return withDirectives(clonedVNode, [[setRef]])
    }
  },
})
