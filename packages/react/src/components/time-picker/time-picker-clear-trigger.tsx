import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerClearTriggerBaseProps extends PolymorphicProps {}
export interface TimePickerClearTriggerProps
  extends HTMLProps<'button'>,
    TimePickerClearTriggerBaseProps {}

export const TimePickerClearTrigger = forwardRef<HTMLButtonElement, TimePickerClearTriggerProps>(
  (props, ref) => {
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getClearTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TimePickerClearTrigger.displayName = 'TimePickerClearTrigger'
