import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseDatePickerProps
  extends Optional<
    Omit<
      datePicker.Context,
      'dir' | 'getRootNode' | 'value' | 'min' | 'max' | 'parse' | 'focusedValue' | 'open.controlled'
    >,
    'id'
  > {
  /**
   * The initial open state of the date picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: datePicker.Context['open']
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
  /**
   * The minimum date for the date picker in the format yyyy-mm-dd
   */
  min?: string
  /**
   * The maximum date for the date picker in the format yyyy-mm-dd
   */
  max?: string
}

export interface UseDatePickerReturn extends datePicker.Api<PropTypes> {}

export const useDatePicker = (props: UseDatePickerProps = {}): UseDatePickerReturn => {
  const initialContext: datePicker.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    focusedValue: props.focusedValue ? datePicker.parse(props.focusedValue) : undefined,
    value: props.defaultValue ? datePicker.parse(props.defaultValue) : undefined,
    max: props.max ? datePicker.parse(props.max) : undefined,
    min: props.min ? datePicker.parse(props.min) : undefined,
    open: props.open ?? props.defaultOpen,
    'open.controlled': props.open !== undefined,
  }

  const context: datePicker.Context = {
    ...initialContext,
    max: props.max ? datePicker.parse(props.max) : undefined,
    min: props.min ? datePicker.parse(props.min) : undefined,
    value: props.value ? datePicker.parse(props.value) : undefined,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onFocusChange: useEvent(props.onFocusChange),
    onViewChange: useEvent(props.onViewChange),
    onOpenChange: useEvent(props.onOpenChange),
  }

  const [state, send] = useMachine(datePicker.machine(initialContext), { context })
  return datePicker.connect(state, send, normalizeProps)
}
