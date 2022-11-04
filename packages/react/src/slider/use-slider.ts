import { normalizeProps, useMachine } from '@zag-js/react'
import * as slider from '@zag-js/slider'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseSliderProps = Omit<slider.Context, 'id'>
export type UseSliderReturn = ReturnType<typeof useSlider>

export const useSlider = (props: UseSliderProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })
  const [state, send] = useMachine(slider.machine(initialContext), { context: initialContext })

  return slider.connect(state, send, normalizeProps)
}
