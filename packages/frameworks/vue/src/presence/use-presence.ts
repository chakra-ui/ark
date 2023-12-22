import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref, watch, type VNodeRef } from 'vue'
import type { Optional } from '../types'

export interface UsePresenceProps extends Optional<presence.Context, 'present'> {
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export type UsePresenceReturn = ReturnType<typeof usePresence>

export const usePresence = (props: UsePresenceProps, emit: CallableFunction) => {
  const context = ref(props)
  const wasEverPresent = ref(false)
  const nodeRef = ref<VNodeRef | null>(null)

  const [state, send] = useMachine(
    presence.machine({
      ...context.value,
      onExitComplete: () => {
        emit('exit-complete')
      },
    }),
    { context },
  )
  const api = computed(() => presence.connect(state.value, send, normalizeProps))

  watch(
    () => api.value.isPresent,
    () => {
      const isPresent = api.value.isPresent
      if (isPresent) wasEverPresent.value = true
    },
  )

  watch(nodeRef, () => {
    if (nodeRef.value) {
      const node = nodeRef.value.$el ? nodeRef.value.$el : nodeRef.value
      if (node) {
        api.value.setNode(node)
      }
    }
  })

  return computed(() => ({
    isPresent: api.value.isPresent,
    isUnmounted:
      (!api.value.isPresent && !wasEverPresent.value && props.lazyMount) ||
      (props.unmountOnExit && !api.value.isPresent && wasEverPresent.value),
    presenceProps: {
      ref: nodeRef,
      hidden: !api.value.isPresent,
      'data-state': context.value.present ? 'open' : 'closed',
    },
  }))
}
