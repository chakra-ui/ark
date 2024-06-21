import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerLabelBaseProps extends PolymorphicProps {}
export interface TimePickerLabelProps extends HTMLProps<'label'>, TimePickerLabelBaseProps {}

export const TimePickerLabel = forwardRef<HTMLLabelElement, TimePickerLabelProps>((props, ref) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(timePicker.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

TimePickerLabel.displayName = 'TimePickerLabel'
