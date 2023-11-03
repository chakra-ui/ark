import { defineComponent, ref, watch } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { PresenceProvider } from './presence-context'
import { usePresence, type UsePresenceProps } from './use-presence'

export interface PresenceProps extends Assign<HTMLArkProps<'div'>, UsePresenceProps> {}

export const Presence = defineComponent({
  name: 'Presence',
  props: {
    present: {
      type: Boolean,
      default: undefined,
    },
    lazyMount: {
      type: Boolean,
      default: undefined,
    },
    unmountOnExit: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: [],
  setup(props, { slots, attrs, emit }) {
    const api = usePresence(props, emit)
    // const wasEverPresent = ref(false)
    const nodeRef = ref<HTMLElement | null>(null)
    PresenceProvider(api)

    watch(nodeRef, () => {
      api.value.setNode(nodeRef.value)
    })

    // watch(
    //   () => api.value.isPresent,
    //   (newValue) => {
    //     if (newValue) {
    //       wasEverPresent.value = true
    //     }
    //   },
    // )

    // const isUnmounted = computed(
    //   () =>
    //     (!api.value.isPresent && !wasEverPresent.value && props.lazyMount) ||
    //     (props.unmountOnExit && !api.value.isPresent && wasEverPresent.value),
    // )

    return () => (
      <ark.div
        ref={nodeRef}
        {...attrs}
        hidden={!api.value.isPresent}
        data-scope="presence"
        data-part="root"
        data-state={props.present ? 'open' : 'closed'}
      >
        {slots?.default?.()}
      </ark.div>
    )
  },
})
