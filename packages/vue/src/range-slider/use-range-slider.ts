import { connect, machine, type Context } from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, watch, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

type UseRangeSliderPropsContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
}

export type UseRangeSliderProps = {
  context: UseRangeSliderPropsContext
  emit: CallableFunction
}

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      value: context.modelValue ?? context.value,
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
    () => context.modelValue,
    (val, oldVal) => {
      if (val == undefined || val === oldVal) return

      api.value.setValue(val)
    },
  )

  return api
}

export type UseRangeSliderReturn = UnwrapRef<ReturnType<typeof useRangeSlider>>
