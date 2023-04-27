import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseRangeSliderProps = Optional<rangeSlider.Context, 'id'>
export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), values: props.value, getRootNode }, props)

  const [state, send] = useMachine(rangeSlider.machine(context), {
    context,
  })

  return createMemo(() => rangeSlider.connect(state, send, normalizeProps))
}
