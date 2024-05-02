import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId, splitProps } from 'solid-js'
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
export interface UseDatePickerReturn extends Accessor<datePicker.Api<PropTypes>> {}

export const useDatePicker = (props: UseDatePickerProps): UseDatePickerReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const [localProps, restProps] = splitProps(props, ['value', 'focusedValue', 'min', 'max'])

  const context = mergeProps(
    () => ({
      id: createUniqueId(),
      dir: locale().dir,
      getRootNode: environment().getRootNode,
      'open.controlled': props.open !== undefined,
      focusedValue: localProps.focusedValue ? datePicker.parse(localProps.focusedValue) : undefined,
      value: localProps.value ? datePicker.parse(localProps.value) : undefined,
      max: localProps.max ? datePicker.parse(localProps.max) : undefined,
      min: localProps.min ? datePicker.parse(localProps.min) : undefined,
    }),
    restProps,
  )

  const [state, send] = useMachine(datePicker.machine(context), { context })

  return createMemo(() => datePicker.connect(state, send, normalizeProps))
}
