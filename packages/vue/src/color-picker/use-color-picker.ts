import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useId } from '../utils'
import type { ColorPickerContext } from './color-picker'

export const useColorPicker = <T extends ExtractPropTypes<ColorPickerContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    colorPicker.machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
      onChangeEnd(details) {
        emit('change-end', details)
      },
    }),
  )

  return computed(() => colorPicker.connect(state.value, send, normalizeProps))
}

export type UseColorPickerReturn = ReturnType<typeof colorPicker.connect>
