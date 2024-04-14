import * as slider from '@zag-js/slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils/utils'

export interface UseSliderProps extends Optional<slider.Context, 'id'> {
  modelValue?: slider.Context['value']
}
export interface UseSliderReturn extends ComputedRef<slider.Api<PropTypes>> {}

export const useSlider = (props: UseSliderProps, emit: CallableFunction): UseSliderReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    slider.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onFocusChange: (details) => {
        emit('focus-change', details)
      },
      onValueChangeEnd: (details) => {
        emit('value-change-end', details)
      },
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => slider.connect(state.value, send, normalizeProps))
}
