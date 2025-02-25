import * as tooltip from '@zag-js/tooltip'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './tooltip.types'

export interface UseTooltipProps extends Optional<Omit<tooltip.Props, 'dir' | 'getRootNode' | 'open'>, 'id'> {
  /**
   * The v-model open state of the tooltip
   */
  modelOpen?: tooltip.Props['open']
}
export interface UseTooltipReturn extends ComputedRef<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps = {}, emit?: EmitFn<RootEmits>): UseTooltipReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<tooltip.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    open: props.modelOpen,
    onOpenChange: (details) => {
      emit?.('openChange', details)
      emit?.('update:open', details.open) // TODO: remove this
      emit?.('update:modelOpen', details.open)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(tooltip.machine, context)
  return computed(() => tooltip.connect(service, normalizeProps))
}
