import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerControlBaseProps extends PolymorphicProps {}
export interface TimePickerControlProps extends HTMLProps<'div'>, TimePickerControlBaseProps {}

export const TimePickerControl = forwardRef<HTMLDivElement, TimePickerControlProps>(
  (props, ref) => {
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TimePickerControl.displayName = 'TimePickerControl'
