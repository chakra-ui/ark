import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

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
   * The initial value of the date picker when it is first rendered.
   * Use when you do not need to control the state of the date picker.
   */
  defaultValue?: string[]
  /**
   * The focused date.
   */
  focusedValue?: string
  /**
   * The maximum date for the date picker in the format yyyy-mm-dd
   */
  max?: string
  /**
   * The minimum date for the date picker in the format yyyy-mm-dd
   */
  min?: string
  /**
   * The value of the date picker
   */
  value?: string[]
}
export interface UseDatePickerReturn extends Accessor<datePicker.Api<PropTypes>> {}

export const useDatePicker = (props: UseDatePickerProps): UseDatePickerReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    'open.controlled': props.open !== undefined,
    open: props.defaultOpen,
    ...props,
    focusedValue: props.focusedValue ? datePicker.parse(props.focusedValue) : undefined,
    value: props.value
      ? datePicker.parse(props.value)
      : props.defaultValue
        ? datePicker.parse(props.defaultValue)
        : undefined,
    max: props.max ? datePicker.parse(props.max) : undefined,
    min: props.min ? datePicker.parse(props.min) : undefined,
  }))

  const [state, send] = useMachine(datePicker.machine(context()), { context })

  return createMemo(() => datePicker.connect(state, send, normalizeProps))
}
