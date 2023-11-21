import * as slider from '@zag-js/slider'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './slider.props'

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
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    slider.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      ...eventMap,
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onValueChangeEnd(details) {
        emit('value-change-end', details)
      },
    }),
    { context },
  )

  return computed(() => slider.connect(state.value, send, normalizeProps))
}
