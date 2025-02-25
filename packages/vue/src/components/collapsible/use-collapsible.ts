import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref, useId, watch } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits } from './collapsible.types'

export interface UseCollapsibleProps
  extends RenderStrategyProps,
    Optional<Omit<collapsible.Props, 'dir' | 'getRootNode' | 'open'>, 'id'> {
  /**
   * The v-model value of the collapsible
   */
  modelValue?: collapsible.Props['open']
}

interface Collapsible extends collapsible.Api<PropTypes> {
  /**
   * Whether the content is unmounted
   */
  unmounted?: boolean
}

export interface UseCollapsibleReturn extends ComputedRef<Collapsible> {}

export const useCollapsible = (props: UseCollapsibleProps = {}, emits?: EmitFn<RootEmits>): UseCollapsibleReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<collapsible.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    open: props.modelValue,
    onExitComplete: () => emits?.('exitComplete'),
    onOpenChange: (details) => {
      emits?.('openChange', details)
      emits?.('update:open', details.open) // TODO: remove this
      emits?.('update:modelValue', details.open)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(collapsible.machine, context)
  const api = computed(() => collapsible.connect(service, normalizeProps))

  const wasVisible = ref(false)
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
      (!api.value.visible && !wasVisible.value && props.lazyMount) ||
      (props.unmountOnExit && !api.value.visible && wasVisible.value),
  }))
}
