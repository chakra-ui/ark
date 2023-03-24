import { connect, machine, type Context as SliderContext } from '@zag-js/slider'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type UnwrapRef, watch } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

type UseSliderPropsContext = Optional<SliderContext, 'id'> & {
  modelValue?: SliderContext['value']
}

export type UseSliderProps = {
  context: UseSliderPropsContext
  emit: CallableFunction
}

export const useSlider = (props: UseSliderProps) => {
  const { context, emit } = transformComposableProps(props)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      getRootNode,
      value: context.modelValue ?? context.value,
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
    () => context.modelValue,
    (val, oldVal) => {
      if (val == undefined || val === oldVal) return

      api.value.setValue(val)
    },
  )

  return api
}

export type UseSliderReturn = UnwrapRef<ReturnType<typeof useSlider>>
