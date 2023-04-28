import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseColorPickerContext extends Optional<colorPicker.Context, 'id'> {
  modelValue?: colorPicker.Context['value']
}

export const useColorPicker = (emit: CallableFunction, context: UseColorPickerContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    colorPicker.machine({
      ...reactiveContext,
      id: useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      // ! Check this before taking PR out of draft
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

export type UseColorPickerReturn = ReturnType<typeof useColorPicker>
