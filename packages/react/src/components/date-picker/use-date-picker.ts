import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseDatePickerProps
  extends Optional<
    Omit<datePicker.Context, 'dir' | 'getRootNode' | 'parse' | 'open.controlled'>,
    'id'
  > {
  /**
   * The initial open state of the date picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: datePicker.Context['open']
  /**
   * The initial value of the date picker when it is first rendered.
   * Use when you do not need to control the state of the date picker.
   */
  defaultValue?: datePicker.Context['value']
}

export interface UseDatePickerReturn extends datePicker.Api<PropTypes> {}

export const useDatePicker = (props: UseDatePickerProps = {}): UseDatePickerReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: datePicker.Context = {
    id: useId(),
    dir,
    getRootNode,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    value: props.defaultValue,
    ...props,
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
