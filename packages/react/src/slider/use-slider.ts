import { normalizeProps, useMachine } from '@zag-js/react'
import * as slider from '@zag-js/slider'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseSliderProps = Optional<slider.Context, 'id'>
export type UseSliderReturn = ReturnType<typeof useSlider>

export const useSlider = (props: UseSliderProps) => {
  const context = {
    id: useId(),
    ...props,
  }
  const [state, send] = useMachine(slider.machine(context), { context })
  return slider.connect(state, send, normalizeProps)
}
