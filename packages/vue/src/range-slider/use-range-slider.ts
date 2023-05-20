import { connect, machine } from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { RangeSliderContext } from './range-slider'

export const useRangeSlider = <T extends ExtractPropTypes<RangeSliderContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
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
