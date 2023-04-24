import { connect, machine, type Context as SliderContext } from '@zag-js/slider'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { useId } from '../utils'

export type UseSliderContext = Optional<SliderContext, 'id'> & {
  modelValue?: SliderContext['value']
}

export const useSlider = (emit: CallableFunction, context: UseSliderContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
      onChangeEnd(details) {
        emit('change-end', details)
      },
      onChangeStart(details) {
        emit('change-start', details)
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

export type UseSliderReturn = UnwrapRef<ReturnType<typeof useSlider>>
