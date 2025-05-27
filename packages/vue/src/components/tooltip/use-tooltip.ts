import * as tooltip from '@zag-js/tooltip'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './tooltip.types'

export interface UseTooltipProps extends Optional<Omit<tooltip.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTooltipReturn extends ComputedRef<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: MaybeRef<UseTooltipProps> = {}, emit?: EmitFn<RootEmits>): UseTooltipReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<tooltip.Props>(() => {
    const localProps = toValue<UseTooltipProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        localProps.onOpenChange?.(details)
      },
    }
  })

  const service = useMachine(tooltip.machine, context)
  return computed(() => tooltip.connect(service, normalizeProps))
}
