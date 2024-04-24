import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as Slider from '@zag-js/slider'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseSliderProps extends Optional<Slider.Context, 'id'> {
  /**
   * The initial value of the slider slider.
   */
  defaultValue?: Slider.Context['value']
}

export interface UseSliderReturn extends Slider.Api<PropTypes> {}

export const useSlider = (props: UseSliderProps): UseSliderReturn => {
  const initialContext: Slider.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: Slider.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueChangeEnd: useEvent(props.onValueChangeEnd),
    onFocusChange: useEvent(props.onFocusChange),
  }

  const [state, send] = useMachine(Slider.machine(initialContext), {
    context,
  })

  return Slider.connect(state, send, normalizeProps)
}
