import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, ref, toValue, useId, watch } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits } from './collapsible.types'

export interface UseCollapsibleProps
  extends RenderStrategyProps,
    Optional<Omit<collapsible.Props, 'dir' | 'getRootNode'>, 'id'> {}

interface Collapsible extends collapsible.Api<PropTypes> {
  /**
   * Whether the content is unmounted
   */
  unmounted?: boolean
}

export interface UseCollapsibleReturn extends ComputedRef<Collapsible> {}

export const useCollapsible = (
  props: MaybeRef<UseCollapsibleProps> = {},
  emits?: EmitFn<RootEmits>,
): UseCollapsibleReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<collapsible.Props>(() => {
    const localeProps = toValue<UseCollapsibleProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onExitComplete: () => {
        emits?.('exitComplete')
        localeProps.onExitComplete?.()
      },
      onOpenChange: (details) => {
        emits?.('openChange', details)
        emits?.('update:open', details.open)
        localeProps.onOpenChange?.(details)
      },
    }
  })

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

  return computed(() => {
    const localeProps = toValue<UseCollapsibleProps>(props)

    return {
      ...api.value,
      unmounted:
        (!api.value.visible && !wasVisible.value && localeProps.lazyMount) ||
        (localeProps.unmountOnExit && !api.value.visible && wasVisible.value),
    }
  })
}
