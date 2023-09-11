import * as datePicker from '@zag-js/date-picker'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UseDatePickerProps extends Optional<datePicker.Context, 'id'> {}
export type UseDatePickerReturn = datePicker.Api

export const useDatePicker = (props: UseDatePickerProps): UseDatePickerReturn => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(datePicker.machine(context), { context })
  return datePicker.connect(state, send, normalizeProps)
}
