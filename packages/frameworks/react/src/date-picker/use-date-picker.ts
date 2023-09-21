import * as datePicker from '@zag-js/date-picker'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseDatePickerProps extends Optional<datePicker.Context, 'id'> {
  /**
   * The initial value of the date picker
   */
  defaultValue?: datePicker.Context['value']
}

export interface UseDatePickerReturn extends datePicker.Api<PropTypes> {}

export const useDatePicker = (props: UseDatePickerProps = {}): UseDatePickerReturn => {
  const initialContext: datePicker.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: datePicker.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onFocusChange: useEvent(props.onFocusChange),
    onViewChange: useEvent(props.onViewChange),
    onOpenChange: useEvent(props.onOpenChange),
  }

  const [state, send] = useMachine(datePicker.machine(initialContext), { context })
  return datePicker.connect(state, send, normalizeProps)
}
