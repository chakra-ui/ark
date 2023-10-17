import * as slider from '@zag-js/slider'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSliderProps = Optional<slider.Context, 'id'>
export type UseSliderReturn = Accessor<slider.Api<PropTypes>>

export const useSlider = (props: UseSliderProps): UseSliderReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(slider.machine(context), { context })

  return createMemo(() => slider.connect(state, send, normalizeProps))
}
