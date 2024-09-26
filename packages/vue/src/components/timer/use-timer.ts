import * as timer from '@zag-js/timer'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './timer.types'

export interface UseTimerProps extends Optional<Omit<timer.Context, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTimerReturn extends ComputedRef<timer.Api<PropTypes>> {}

export const useTimer = (props: UseTimerProps, emit?: EmitFn<RootEmits>): UseTimerReturn => {
  const id = useId()
  const env = useEnvironmentContext()

  const context = computed<timer.Context>(() => ({
    id,
    getRootNode: env?.value.getRootNode,
    onComplete: () => emit?.('complete'),
    onTick: (details) => emit?.('tick', details),
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(timer.machine(context.value), { context })

  return computed(() => timer.connect(state.value, send, normalizeProps))
}
