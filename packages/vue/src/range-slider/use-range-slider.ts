import { connect, machine, type Context } from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useId } from '../utils'

export type UseRangeSliderContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
}

export const useRangeSlider = (emit: CallableFunction, context: UseRangeSliderContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
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

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseRangeSliderReturn = UnwrapRef<ReturnType<typeof useRangeSlider>>
