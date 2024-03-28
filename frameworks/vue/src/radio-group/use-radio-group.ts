import * as radioGroup from '@zag-js/radio-group'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseRadioGroupProps extends Optional<radioGroup.Context, 'id'> {
  modelValue?: radioGroup.Context['value']
}
export interface UseRadioGroupReturn extends ComputedRef<radioGroup.Api<PropTypes>> {}

export const useRadioGroup = (
  props: UseRadioGroupProps,
  emit: CallableFunction,
): UseRadioGroupReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    radioGroup.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => radioGroup.connect(state.value, send, normalizeProps))
}
