import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerTriggerBaseProps extends PolymorphicProps {}
export interface TimePickerTriggerProps extends HTMLProps<'button'>, TimePickerTriggerBaseProps {}

export const TimePickerTrigger = forwardRef<HTMLButtonElement, TimePickerTriggerProps>(
  (props, ref) => {
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TimePickerTrigger.displayName = 'TimePickerTrigger'
