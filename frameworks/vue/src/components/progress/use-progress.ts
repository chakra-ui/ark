import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseProgressProps extends Optional<progress.Context, 'id'> {}
export interface UseProgressReturn extends ComputedRef<progress.Api<PropTypes>> {}

export const useProgress = (props: UseProgressProps): UseProgressReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

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
