import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseColorPickerProps = Optional<colorPicker.Context, 'id'> & {
  modelValue?: colorPicker.Context['value']
  defaultValue?: colorPicker.Context['value']
}

export const useColorPicker = <T extends ExtractPropTypes<UseColorPickerProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = computed(() => ({
    ...context,
    value: (context.modelValue ?? context.value) || context.defaultValue,
  }))

  const [state, send] = useMachine(
    colorPicker.machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
      onChangeEnd(details) {
        emit('change-end', details)
      },
    }),
    { context: machineContext },
  )

  return computed(() => colorPicker.connect(state.value, send, normalizeProps))
}

export type UseColorPickerReturn = ReturnType<typeof useColorPicker>
