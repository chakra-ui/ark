import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerInputBaseProps extends PolymorphicProps {}
export interface TimePickerInputProps extends HTMLProps<'input'>, TimePickerInputBaseProps {}

export const TimePickerInput = forwardRef<HTMLInputElement, TimePickerInputProps>((props, ref) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(timePicker.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

TimePickerInput.displayName = 'TimePickerInput'
