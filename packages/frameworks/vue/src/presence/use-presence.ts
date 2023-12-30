import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref, toValue, watch, type MaybeRef, type VNodeRef } from 'vue'
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

export const usePresence = (props: MaybeRef<UsePresenceProps>, emit: CallableFunction) => {
  const context = computed(() => ({
    ...toValue(props),
    // FIXME: we have to declare here, because zag did not set `onExitComplete` during initialization.
    // FIX PR: https://github.com/chakra-ui/zag/pull/1124, maybe we can move `onExitComplete` to init later.
    onExitComplete: () => {
      emit('exit-complete')
    },
  }))
  const wasEverPresent = ref(false)
  const nodeRef = ref<VNodeRef | null>(null)

  const [state, send] = useMachine(presence.machine(context.value), { context })
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
      (!api.value.isPresent && !wasEverPresent.value && context.value.lazyMount) ||
      (context.value?.unmountOnExit && !api.value?.isPresent && wasEverPresent.value),
    presenceProps: {
      ref: nodeRef,
      hidden: !api.value.isPresent,
      'data-state': context.value?.present ? 'open' : 'closed',
    },
  }))
}
