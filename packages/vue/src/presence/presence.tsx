import { cloneVNode, defineComponent, ref, watch, withDirectives, type PropType } from 'vue'
import { usePresence, type UsePresenceProps } from './use-presence'

export type PresenceProps = {}

export const Presence = defineComponent({
  props: {
    present: {
      type: Boolean,
    },
    onExitComplete: {
      type: Function as PropType<UsePresenceProps['onExitComplete']>,
    },
    lazyMount: {
      type: Boolean,
      default: false,
    },
    unmountOnExit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const api = usePresence(props)
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
