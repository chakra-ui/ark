import * as rangeSlider from '@zag-js/range-slider'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseRangeSliderProps = Optional<rangeSlider.Context, 'id'>
export type UseRangeSliderReturn = Accessor<rangeSlider.Api<PropTypes>>

export const useRangeSlider = (props: UseRangeSliderProps): UseRangeSliderReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), values: props.value, getRootNode }, props)

  const [state, send] = useMachine(rangeSlider.machine(context), {
    context,
  })

  return createMemo(() => rangeSlider.connect(state, send, normalizeProps))
}
