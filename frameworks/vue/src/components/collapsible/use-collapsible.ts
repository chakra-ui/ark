import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref, watch } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits } from './collapsible.types'

export interface UseCollapsibleProps
  extends RenderStrategyProps,
    Optional<Omit<collapsible.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the collapsible when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: collapsible.Context['open']
  /**
   * The controlled open state of the collapsible. Can be binded with v-model.
   */
  open?: collapsible.Context['open']
}

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
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const [state, send] = useMachine(
    collapsible.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      dir: locale.value.dir,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      getRootNode: env?.value.getRootNode,
      onExitComplete: () => emits('exitComplete'),
      onOpenChange: (details) => {
        emits('openChange', details)
        emits('update:open', details.open)
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
