import * as rangeSlider from '@zag-js/range-slider'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import type { Optional } from '../types'

type UseRangeSliderParams = {
  value?: rangeSlider.Context['values']
  defaultValue?: rangeSlider.Context['values']
}
export type UseRangeSliderProps = Optional<rangeSlider.Context, 'id' | 'values'> &
  UseRangeSliderParams

export type UseRangeSliderReturn = ReturnType<typeof useRangeSlider>

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const [localProps, context] = createSplitProps<UseRangeSliderParams>()(props, [
    'defaultValue',
    'value',
  ])
  const initialContext = {
    id: createUniqueId(),
    ...props,
    values: localProps.defaultValue,
  }

  const [state, send] = useMachine(rangeSlider.machine(initialContext), {
    context: { ...context, values: localProps.value },
  })

  return createMemo(() => rangeSlider.connect(state, send, normalizeProps))
}
