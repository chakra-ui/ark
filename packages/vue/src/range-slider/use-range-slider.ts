import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './range-slider.props'

export type UseRangeSliderProps = Optional<rangeSlider.Context, 'id'> & {
  modelValue?: rangeSlider.Context['value']
}
export type UseRangeSliderReturn = ComputedRef<rangeSlider.Api<PropTypes>>

export const useRangeSlider = (
  props: UseRangeSliderProps,
  emit: CallableFunction,
): UseRangeSliderReturn => {
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
    rangeSlider.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      ...eventMap,
      onChange: (details) => {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => rangeSlider.connect(state.value, send, normalizeProps))
}
