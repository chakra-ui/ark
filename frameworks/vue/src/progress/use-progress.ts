import * as progress from '@zag-js/progress'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseProgressProps extends Optional<progress.Context, 'id'> {
  modelValue?: progress.Context['value']
}
export interface UseProgressReturn extends ComputedRef<progress.Api<PropTypes>> {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useProgress = (props: UseProgressProps, emit: CallableFunction): UseProgressReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    progress.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
    }),
    { context },
  )

  return computed(() => progress.connect(state.value, send, normalizeProps))
}
