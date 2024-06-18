import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export type TimePickerControlBaseProps = {}
export interface TimePickerControlProps
  extends Assign<HTMLArkProps<'div'>, TimePickerControlBaseProps> {}

export const TimePickerControl = forwardRef<HTMLDivElement, TimePickerControlProps>(
  (props, ref) => {
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TimePickerControl.displayName = 'TimePickerControl'
