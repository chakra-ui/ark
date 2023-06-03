import * as datePicker from '@zag-js/date-picker'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseDatePickerProps = Optional<datePicker.Context, 'id'>
export type UseDatePickerReturn = ReturnType<typeof useDatePicker>

export const useDatePicker = (props: UseDatePickerProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(datePicker.machine(context), { context })
  return createMemo(() => datePicker.connect(state, send, normalizeProps))
}
