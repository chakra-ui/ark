import * as datePicker from '@zag-js/date-picker'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseDatePickerProps = Optional<datePicker.Context, 'id'>
export type UseDatePickerReturn = Accessor<datePicker.Api<PropTypes>>

export const useDatePicker = (props: UseDatePickerProps): UseDatePickerReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(datePicker.machine(context), { context })
  return createMemo(() => datePicker.connect(state, send, normalizeProps))
}
