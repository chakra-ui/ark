import { normalizeProps, useMachine } from '@zag-js/react'
import * as slider from '@zag-js/slider'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseSliderProps extends Optional<slider.Context, 'id'> {
  defaultValue?: slider.Context['value']
}
export type UseSliderReturn = slider.Api

export const useSlider = (props: UseSliderProps): UseSliderReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue ?? props.value,
  }
  const context: slider.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }
  const [state, send] = useMachine(slider.machine(initialContext), { context })
  return slider.connect(state, send, normalizeProps)
}
