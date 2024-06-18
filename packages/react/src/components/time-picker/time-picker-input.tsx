import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export type TimePickerInputBaseProps = {}
export interface TimePickerInputProps
  extends Assign<HTMLArkProps<'input'>, TimePickerInputBaseProps> {}

export const TimePickerInput = forwardRef<HTMLInputElement, TimePickerInputProps>((props, ref) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(timePicker.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

TimePickerInput.displayName = 'TimePickerInput'
