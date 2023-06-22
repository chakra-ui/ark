import * as datePicker from '@zag-js/date-picker'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export type UseDatePickerProps = Optional<datePicker.Context, 'id'>
export type UseDatePickerReturn = ReturnType<typeof useDatePicker>

export const useDatePicker = (props: UseDatePickerProps) => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(datePicker.machine(context), { context })
  return datePicker.connect(state, send, normalizeProps)
}
