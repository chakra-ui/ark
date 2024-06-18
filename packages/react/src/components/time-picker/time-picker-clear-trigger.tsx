import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export type TimePickerClearTriggerBaseProps = {}
export interface TimePickerClearTriggerProps
  extends Assign<HTMLArkProps<'button'>, TimePickerClearTriggerBaseProps> {}

export const TimePickerClearTrigger = forwardRef<HTMLButtonElement, TimePickerClearTriggerProps>(
  (props, ref) => {
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TimePickerClearTrigger.displayName = 'TimePickerClearTrigger'
