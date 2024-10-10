import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as timePicker from '@zag-js/time-picker'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseTimePickerProps
  extends Optional<Omit<timePicker.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the time picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: timePicker.Context['open']
  /**
   * The initial value of the time picker when it is first rendered.
   * Use when you do not need to control the state of the time picker.
   */
  defaultValue?: timePicker.Context['value']
}

export interface UseTimePickerReturn extends timePicker.Api<PropTypes> {}

export const useTimePicker = (props: UseTimePickerProps = {}): UseTimePickerReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: timePicker.Context = {
    id: useId(),
    dir,
    getRootNode,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    value: props.defaultValue,
    ...props,
  }

  const context: timePicker.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange),
    onFocusChange: useEvent(props.onFocusChange),
    onOpenChange: useEvent(props.onOpenChange),
  }

  const [state, send] = useMachine(timePicker.machine(initialContext), { context })

  return timePicker.connect(state, send, normalizeProps)
}
