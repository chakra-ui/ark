import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import * as slider from '@zag-js/slider'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseSliderProps extends Optional<slider.Context, 'id'> {
  /**
   * The initial value of the slider.
   */
  defaultValue?: slider.Context['value']
}

export interface UseSliderReturn extends slider.Api<PropTypes> {}

export const useSlider = (props: UseSliderProps): UseSliderReturn => {
  const initialContext: slider.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: slider.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueChangeEnd: useEvent(props.onValueChangeEnd),
    onValueChangeStart: useEvent(props.onValueChangeStart),
  }

  const [state, send] = useMachine(slider.machine(initialContext), { context })

  return slider.connect(state, send, normalizeProps)
}
