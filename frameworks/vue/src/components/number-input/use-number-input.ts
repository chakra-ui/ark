import * as numberInput from '@zag-js/number-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils/utils'

export interface UseNumberInputProps extends Optional<numberInput.Context, 'id'> {
  modelValue?: numberInput.Context['value']
}
export interface UseNumberInputReturn extends ComputedRef<numberInput.Api<PropTypes>> {}

export const useNumberInput = (
  props: UseNumberInputProps,
  emit: CallableFunction,
): UseNumberInputReturn => {
  const getRootNode = useEnvironmentContext()

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
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onFocusChange: (details) => {
        emit('focus-change', details)
      },
      onValueInvalid: (details) => {
        emit('value-invalid', details)
      },
    }),
    { context },
  )

  return computed(() => numberInput.connect(state.value, send, normalizeProps))
}
