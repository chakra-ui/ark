import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironment } from '../environment'
import type { Optional } from '../types'

export type UseRangeSliderProps = Optional<rangeSlider.Context, 'id'> & {
  defaultValue?: rangeSlider.Context['value']
}

export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const initialContext = useEnvironment({
    id: useId(),
    ...props,
    value: props.defaultValue,
  })

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(rangeSlider.machine(initialContext), {
    context,
  })

  return rangeSlider.connect(state, send, normalizeProps)
}
