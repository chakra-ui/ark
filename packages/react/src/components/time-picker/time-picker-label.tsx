import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export type TimePickerLabelBaseProps = {}
export interface TimePickerLabelProps
  extends Assign<HTMLProps<'label'>, TimePickerLabelBaseProps> {}

export const TimePickerLabel = forwardRef<HTMLLabelElement, TimePickerLabelProps>((props, ref) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(timePicker.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

TimePickerLabel.displayName = 'TimePickerLabel'
