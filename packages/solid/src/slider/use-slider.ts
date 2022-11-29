import * as slider from '@zag-js/slider'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseSliderProps = Optional<slider.Context, 'id'>
export type UseSliderReturn = ReturnType<typeof useSlider>

export const useSlider = (props: UseSliderProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(slider.machine(context), { context })
  return createMemo(() => slider.connect(state, send, normalizeProps))
}
