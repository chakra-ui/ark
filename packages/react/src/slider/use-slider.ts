import { normalizeProps, useMachine } from '@zag-js/react'
import * as slider from '@zag-js/slider'
import { useCallback, useId } from 'react'
import { flushSync } from 'react-dom'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSliderProps = Optional<slider.Context, 'id'> & {
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
  const onChange = props.onChange

  const onChangeWithFlushSync = useCallback(
    (e: { value: number }) => flushSync(() => onChange?.(e)),
    [onChange],
  )

  const context: slider.Context = {
    ...initialContext,
    value: props.value,
    onChange: onChangeWithFlushSync,
  }
  const [state, send] = useMachine(slider.machine(initialContext), { context })
  return slider.connect(state, send, normalizeProps)
}
