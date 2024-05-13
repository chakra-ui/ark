import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as slider from '@zag-js/slider'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseSliderProps
  extends Optional<Omit<slider.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the slider when it is first rendered.
   * Use when you do not need to control the state of the slider picker.
   */
  defaultValue?: slider.Context['value']
}

export interface UseSliderReturn extends slider.Api<PropTypes> {}

export const useSlider = (props: UseSliderProps): UseSliderReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: slider.Context = {
    id: useId(),
    dir,
    getRootNode,
    value: props.defaultValue,
    ...props,
  }

  const context: slider.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueChangeEnd: useEvent(props.onValueChangeEnd),
    onFocusChange: useEvent(props.onFocusChange),
  }

  const [state, send] = useMachine(slider.machine(initialContext), {
    context,
  })

  return slider.connect(state, send, normalizeProps)
}
