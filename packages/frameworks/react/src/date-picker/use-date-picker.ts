import * as datePicker from '@zag-js/date-picker'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseDatePickerProps
  extends Optional<Omit<datePicker.Context, 'value' | 'focusedValue'>, 'id'> {
  /**
   * The initial value of the date picker
   */
  defaultValue?: string[]
  /**
   * The focused date.
   */
  focusedValue?: string
  /**
   * The value of the date picker
   */
  value?: string[]
}

export interface UseDatePickerReturn extends datePicker.Api<PropTypes> {}

export const useDatePicker = (props: UseDatePickerProps = {}): UseDatePickerReturn => {
  const initialContext: datePicker.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    focusedValue: props.focusedValue ? datePicker.parse(props.focusedValue) : undefined,
    value: props.defaultValue ? datePicker.parse(props.defaultValue) : undefined,
  }

  const context: datePicker.Context = {
    ...initialContext,
    value: props.value ? datePicker.parse(props.value) : undefined,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onFocusChange: useEvent(props.onFocusChange),
    onViewChange: useEvent(props.onViewChange),
    onOpenChange: useEvent(props.onOpenChange),
  }

  const [state, send] = useMachine(datePicker.machine(initialContext), { context })
  return datePicker.connect(state, send, normalizeProps)
}
