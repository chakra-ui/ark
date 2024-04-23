import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { type MaybeRef, type VNodeRef, computed, ref, watch } from 'vue'
import type { Optional } from '../../types'

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

export const usePresence = (props: MaybeRef<UsePresenceProps>, emit: CallableFunction) => {
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
    () => api.value.present,
    () => {
      const isPresent = api.value.present
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
    present: api.value.present,
    unmounted:
      (!api.value.present && !wasEverPresent.value && context.value.lazyMount) ||
      (context.value?.unmountOnExit && !api.value?.present && wasEverPresent.value),
    presenceProps: {
      ref: nodeRef,
      hidden: !api.value.present,
      'data-state': context.value?.present ? 'open' : 'closed',
    },
  }))
}
