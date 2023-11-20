import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseColorPickerProps = Optional<Omit<colorPicker.Context, 'value'>, 'id'> & {
  modelValue?: string
}
export type UseColorPickerReturn = ComputedRef<colorPicker.Api<PropTypes>>

export const useColorPicker = (
  props: UseColorPickerProps,
  emit: CallableFunction,
): UseColorPickerReturn => {
  const getRootNode = useEnvironmentContext()

  const context = computed(() => {
    const { modelValue, ...rest } = props
    console.log('###', modelValue)
    return {
      ...rest,
      value: modelValue ? colorPicker.parse(modelValue) : undefined,
    }
  })

  console.log(context.value)

  const [state, send] = useMachine(
    colorPicker.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onValueChange(details) {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onValueChangeEnd(details) {
        emit('value-change-end', details)
      },
    }),
    { context },
  )

  return computed(() => colorPicker.connect(state.value, send, normalizeProps))
}
