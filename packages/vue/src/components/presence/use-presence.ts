import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { type MaybeRef, type VNodeRef, computed, ref, toValue, watch } from 'vue'
import type { EmitFn } from '../../types'
import type { RootEmits } from './presence.types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'

/**
 * because [@vue/compiler-sfc] runtime error: Failed to resolve extends base type.
 * we copy the props from @zag-js/presence props into UsePresenceProps
 * using @vue-ignore will let props fall through to the $attrs
 */
export interface UsePresenceProps extends RenderStrategyProps {
  /**
   * Whether the node is present (controlled by the user)
   */
  present?: boolean | undefined
  /**
   * Whether to synchronize the present change immediately or defer it to the next frame
   */
  immediate?: boolean | undefined
  /**
   * Whether to allow the initial presence animation.
   * @default false
   */
  skipAnimationOnMount?: boolean
}

export type UsePresenceReturn = ReturnType<typeof usePresence>

export const usePresence = (props: MaybeRef<UsePresenceProps>, emit?: EmitFn<RootEmits>) => {
  const wasEverPresent = ref(false)
  const nodeRef = ref<VNodeRef | null>(null)

  const machineProps = computed(() => {
    const presenceProps = toValue(props)
    return {
      present: presenceProps.present,
      onExitComplete: () => emit?.('exitComplete'),
    }
  })

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
        'data-state':
          api.value.skip && localProps.skipAnimationOnMount ? undefined : localProps?.present ? 'open' : 'closed',
      },
    }
  })
}
