import * as tooltip from '@zag-js/tooltip'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, reactive, watch, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseTooltipProps extends Omit<Optional<tooltip.Context, 'id'>, 'open.controlled'> {
  /**
   * The initial open state of the tooltip.
   */
  defaultOpen?: tooltip.Context['open']
}

export interface UseTooltipReturn extends ComputedRef<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps, emit: CallableFunction): UseTooltipReturn => {
  const reactiveContext = reactive(props)
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    tooltip.machine({
      ...reactiveContext,
      id: reactiveContext.id ?? useId().value,
      getRootNode,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      onOpenChange: (details) => {
        emit('open-change', details)
      },
    }),
  )

  const api = computed(() => tooltip.connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.open,
    (value) => {
      if (value === undefined) return
      if (value) {
        api.value.open()
      } else {
        api.value.close()
      }
    },
  )

  return api
}
