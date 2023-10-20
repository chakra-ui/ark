import * as datePicker from '@zag-js/date-picker'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, splitProps, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseDatePickerProps
  extends Optional<Omit<datePicker.Context, 'value' | 'focusedValue'>, 'id'> {
  /**
   * The focused date.
   */
  focusedValue?: string
  /**
   * The value of the date picker
   */
  value?: string[]
}
export interface UseDatePickerReturn extends Accessor<datePicker.Api<PropTypes>> {}

export const useDatePicker = (props: UseDatePickerProps): UseDatePickerReturn => {
  const [local, rest] = splitProps(props, ['value', 'focusedValue'])
  const getRootNode = useEnvironmentContext()
  const context = mergeProps(
    () => ({
      id: createUniqueId(),
      getRootNode,
      focusedValue: local.focusedValue ? datePicker.parse(local.focusedValue) : undefined,
      value: local.value ? datePicker.parse(local.value) : undefined,
    }),
    rest,
  )
  const [state, send] = useMachine(datePicker.machine(context), { context })

  return createMemo(() => datePicker.connect(state, send, normalizeProps))
}
