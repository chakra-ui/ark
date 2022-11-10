import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UseRangeSliderProps = Omit<rangeSlider.Context, 'id' | 'values'> & {
  value?: rangeSlider.Context['values']
  defaultValue?: rangeSlider.Context['values']
}

export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const { defaultValue, value, ...restProps } = props

  const initialContext = {
    ...props,
    id: useId(),
    values: defaultValue,
  }

  const [state, send] = useMachine(rangeSlider.machine(initialContext), {
    context: { ...restProps, values: value },
  })

  return rangeSlider.connect(state, send, normalizeProps)
}
