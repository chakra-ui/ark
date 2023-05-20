import { connect, machine } from '@zag-js/slider'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { SliderContext } from './slider'

export const useSlider = <T extends ExtractPropTypes<SliderContext>>(
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

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseSliderReturn = UnwrapRef<ReturnType<typeof useSlider>>
