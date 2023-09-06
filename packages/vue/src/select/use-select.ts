import * as select from '@zag-js/select'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './select.props'

export type UseSelectProps = Optional<select.Context, 'id'> & {
  modelValue?: select.Context['value']
}
export type UseSelectReturn = ComputedRef<select.Api<PropTypes>>

export const useSelect = (props: UseSelectProps, emit: CallableFunction): UseSelectReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    select.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      ...eventMap,
      onChange: (details) => {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )
  return computed(() => select.connect(state.value, send, normalizeProps))
}
