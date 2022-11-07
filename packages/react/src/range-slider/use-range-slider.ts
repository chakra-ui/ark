import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseRangeSliderProps = Omit<rangeSlider.Context, 'id'>
export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })
  const [state, send] = useMachine(rangeSlider.machine(initialContext), { context: initialContext })

  return rangeSlider.connect(state, send, normalizeProps)
}
