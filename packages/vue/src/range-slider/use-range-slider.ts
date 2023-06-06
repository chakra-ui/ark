import { connect, machine, type Context } from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseRangeSliderContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
  defaultValue?: Context['value']
}

export const useRangeSlider = <T extends ExtractPropTypes<UseRangeSliderContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const getRootNode = useEnvironmentContext()
  const initialContext = reactive({
    ...context,
    getRootNode,
    id: context.id || useId().value,
    value: (context.modelValue ?? context.value) || context.defaultValue,
  })

  const machineContext = computed(() => ({
    ...initialContext.value,
    value: context.value,
  }))

  const [state, send] = useMachine(
    machine({
      ...initialContext,
      onChangeStart(details) {
        emit('change-start', details)
      },
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', Array.from(details.value))
      },
      onChangeEnd(details) {
        emit('change-end', details)
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>
