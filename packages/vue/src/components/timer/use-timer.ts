import * as timer from '@zag-js/timer'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './timer.types'

export interface UseTimerProps extends Optional<Omit<timer.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTimerReturn extends ComputedRef<timer.Api<PropTypes>> {}

export const useTimer = (props: UseTimerProps, emit?: EmitFn<RootEmits>): UseTimerReturn => {
  const id = useId()
  const env = useEnvironmentContext()

  const context = computed<timer.Props>(() => ({
    id,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onComplete: () => {
      emit?.('complete')
      props.onComplete?.()
    },
    onTick: (details) => {
      emit?.('tick', details)
      props.onTick?.(details)
    },
  }))

  const service = useMachine(timer.machine, context)
  return computed(() => timer.connect(service, normalizeProps))
}
