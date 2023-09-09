import * as toggle from '@zag-js/toggle'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseToggleProps = Optional<toggle.Context, 'id'>
export type UseToggleReturn = ComputedRef<toggle.Api<PropTypes>>

export const useToggle = (props: UseToggleProps, emit: CallableFunction): UseToggleReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    toggle.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onChange: (value) => {
        emit('change', value)
      },
    }),
    { context },
  )
  return computed(() => toggle.connect(state.value, send, normalizeProps))
}
