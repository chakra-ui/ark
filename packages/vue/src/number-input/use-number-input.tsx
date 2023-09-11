import * as numberInput from '@zag-js/number-input'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './number-input.props'

export type UseNumberInputProps = Optional<numberInput.Context, 'id'> & {
  modelValue?: numberInput.Context['value']
}
export type UseNumberInputReturn = ComputedRef<numberInput.Api<PropTypes>>

export const useNumberInput = (
  props: UseNumberInputProps,
  emit: CallableFunction,
): UseNumberInputReturn => {
  const getRootNode = useEnvironmentContext()
  const eventMap = generateEventMap(emits, emit)

  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    numberInput.machine({
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

  return computed(() => numberInput.connect(state.value, send, normalizeProps))
}
