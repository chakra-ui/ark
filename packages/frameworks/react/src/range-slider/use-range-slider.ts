import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseRangeSliderProps extends Optional<rangeSlider.Context, 'id'> {
  /**
   * The initial value of the range slider.
   */
  defaultValue?: rangeSlider.Context['value']
}

export interface UseRangeSliderReturn extends rangeSlider.Api<PropTypes> {}

export const useRangeSlider = (props: UseRangeSliderProps): UseRangeSliderReturn => {
  const initialContext: rangeSlider.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: rangeSlider.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueChangeStart: useEvent(props.onValueChangeStart),
    onValueChangeEnd: useEvent(props.onValueChangeEnd),
    onFocusChange: useEvent(props.onFocusChange),
  }

  const [state, send] = useMachine(rangeSlider.machine(initialContext), {
    context,
  })

  return rangeSlider.connect(state, send, normalizeProps)
}
