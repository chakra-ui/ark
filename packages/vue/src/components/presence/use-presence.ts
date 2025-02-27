import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { type MaybeRef, type VNodeRef, computed, ref, toValue, watch } from 'vue'
import type { EmitFn, Optional } from '../../types'
import type { RootEmits } from './presence.types'

export interface UsePresenceProps extends Optional<presence.Props, 'present'> {
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

export const usePresence = (props: MaybeRef<UsePresenceProps>, emit?: EmitFn<RootEmits>) => {
  const wasEverPresent = ref(false)
  const nodeRef = ref<VNodeRef | null>(null)

  const machineProps = computed(() => ({
    present: toValue(props).present,
    onExitComplete: () => emit?.('exitComplete'),
  }))

  const service = useMachine(presence.machine, machineProps)
  const api = computed(() => presence.connect(service, normalizeProps))

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

  return computed(() => {
    const localProps = toValue(props)
    return {
      present: api.value.present,
      unmounted:
        (!api.value.present && !wasEverPresent.value && localProps.lazyMount) ||
        (localProps?.unmountOnExit && !api.value?.present && wasEverPresent.value),
      presenceProps: {
        ref: nodeRef,
        hidden: !api.value.present,
        'data-state': localProps?.present ? 'open' : 'closed',
      },
    }
  })
}
