import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export type TimePickerTriggerBaseProps = {}
export interface TimePickerTriggerProps
  extends Assign<HTMLProps<'button'>, TimePickerTriggerBaseProps> {}

export const TimePickerTrigger = forwardRef<HTMLButtonElement, TimePickerTriggerProps>(
  (props, ref) => {
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TimePickerTrigger.displayName = 'TimePickerTrigger'
