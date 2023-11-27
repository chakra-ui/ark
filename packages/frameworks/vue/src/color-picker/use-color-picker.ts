import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseColorPickerProps extends Optional<Omit<colorPicker.Context, 'value'>, 'id'> {
  modelValue?: string
}
export interface UseColorPickerReturn extends ComputedRef<colorPicker.Api<PropTypes>> {}

export const useColorPicker = (
  props: UseColorPickerProps,
  emit: CallableFunction,
): UseColorPickerReturn => {
  const getRootNode = useEnvironmentContext()

  const context = computed(() => {
    const { modelValue, ...rest } = props
    console.log('context', modelValue)
    modelValue ? console.log('parsed', colorPicker.parse(modelValue)) : null
    return {
      ...rest,
      value: modelValue ? colorPicker.parse(modelValue) : undefined,
    }
  })

  console.log('context value', context.value)

  const [state, send] = useMachine(
    colorPicker.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onFormatChange(details) {
        emit('format-change', details)
      },
      onOpenChange(details) {
        emit('open-change', details)
      },
      onValueChange(details) {
        console.log('value change', details)
        emit('value-change', details)
        emit('update:modelValue', details.valueAsString)
      },
      onValueChangeEnd(details) {
        emit('value-change-end', details)
      },
    }),
    { context },
  )

  return computed(() => colorPicker.connect(state.value, send, normalizeProps))
}
