import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

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

  const [state, send] = useMachine(
    rangeSlider.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onFocusChange: (details) => {
        emit('focus-change', details)
      },
      onValueChangeStart: (details) => {
        emit('value-change-start', details)
      },
      onValueChangeEnd: (details) => {
        emit('value-change-end', details)
      },
    }),
    { context },
  )

  return computed(() => rangeSlider.connect(state.value, send, normalizeProps))
}
