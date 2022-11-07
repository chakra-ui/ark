import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseRangeSliderProps = Omit<rangeSlider.Context, 'id' | 'values'> & {
  value?: rangeSlider.Context['values']
  defaultValue?: rangeSlider.Context['values']
}

export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    values: props.value ?? props.defaultValue,
    ...props,
  })
  const [state, send] = useMachine(rangeSlider.machine(initialContext))

  return rangeSlider.connect(state, send, normalizeProps)
}
