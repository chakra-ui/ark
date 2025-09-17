import * as timer from '@zag-js/timer'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './timer.types'

export interface UseTimerProps extends Optional<Omit<timer.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTimerReturn extends ComputedRef<timer.Api<PropTypes>> {}

export const useTimer = (props: MaybeRef<UseTimerProps>, emit?: EmitFn<RootEmits>): UseTimerReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

  const context = computed<timer.Props>(() => {
    const localProps = toValue<UseTimerProps>(props)

    return {
      id,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onComplete: () => {
        emit?.('complete')
        localProps.onComplete?.()
      },
      onTick: (details) => {
        emit?.('tick', details)
        localProps.onTick?.(details)
      },
    }
  })

  const service = useMachine(timer.machine, context)
  return computed(() => timer.connect(service, normalizeProps))
}
