import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseRangeSliderProps extends Optional<rangeSlider.Context, 'id'> {
  defaultValue?: rangeSlider.Context['value']
}
export type UseRangeSliderReturn = rangeSlider.Api

export const useRangeSlider = (props: UseRangeSliderProps): UseRangeSliderReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue,
  }

  const context: rangeSlider.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }

  const [state, send] = useMachine(rangeSlider.machine(initialContext), {
    context,
  })

  return rangeSlider.connect(state, send, normalizeProps)
}
