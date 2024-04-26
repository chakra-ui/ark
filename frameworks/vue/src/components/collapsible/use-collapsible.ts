import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref, watch } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits } from './collapsible.types'

export interface UseCollapsibleProps
  extends RenderStrategyProps,
    Optional<Omit<collapsible.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {}

interface Collapsible extends collapsible.Api<PropTypes> {
  /**
   * Whether the content is unmounted
   */
  unmounted?: boolean
}

export interface UseCollapsibleReturn extends ComputedRef<Collapsible> {}

export const useCollapsible = (
  props: UseCollapsibleProps,
  emits: EmitFn<RootEmits>,
): UseCollapsibleReturn => {
  const context = ref(props)
  const wasVisible = ref(false)
  const env = useEnvironmentContext()

  const [state, send] = useMachine(
    collapsible.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      'open.controlled': props.open !== undefined,
      onExitComplete: () => {
        emits('exitComplete')
      },
    }),
    { context },
  )
  const api = computed(() => collapsible.connect(state.value, send, normalizeProps))

  watch(
    () => api.value.visible,
    () => {
      if (api.value.visible) {
        wasVisible.value = true
      }
    },
  )

  return computed(() => ({
    ...api.value,
    unmounted:
      (!api.value.visible && !wasVisible.value && context.value.lazyMount) ||
      (context.value?.unmountOnExit && !api.value.visible && wasVisible.value),
  }))
}
