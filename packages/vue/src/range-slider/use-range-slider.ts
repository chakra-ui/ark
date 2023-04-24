import { connect, machine, type Context } from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { useId } from '../utils'

export type UseRangeSliderContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
}

export const useRangeSlider = (emit: CallableFunction, context: UseRangeSliderContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onChangeStart(details) {
        emit('change-start', details)
      },
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
      onChangeEnd(details) {
        emit('change-end', details)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.modelValue,
    (val, oldVal) => {
      if (val == undefined || val === oldVal) return

      api.value.setValue(val)
    },
  )

  return api
}

export type UseRangeSliderReturn = UnwrapRef<ReturnType<typeof useRangeSlider>>
