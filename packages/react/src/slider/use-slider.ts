import { normalizeProps, useMachine } from '@zag-js/react'
import * as slider from '@zag-js/slider'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseSliderProps = Optional<slider.Context, 'id'> & {
  defaultValue?: slider.Context['value']
}
export type UseSliderReturn = ReturnType<typeof useSlider>

export const useSlider = (props: UseSliderProps) => {
  const initialContext = { id: useId(), ...props, value: props.defaultValue }
  const context = {
    ...initialContext,
    value: props.value,
  }
  const [state, send] = useMachine(slider.machine(initialContext), { context })
  return slider.connect(state, send, normalizeProps)
}
