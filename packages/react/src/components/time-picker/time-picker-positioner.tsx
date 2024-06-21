import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerPositionerBaseProps extends PolymorphicProps {}
export interface TimePickerPositionerProps
  extends HTMLProps<'div'>,
    TimePickerPositionerBaseProps {}

export const TimePickerPositioner = forwardRef<HTMLDivElement, TimePickerPositionerProps>(
  (props, ref) => {
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getPositionerProps(), props)
    const presence = usePresenceContext()

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TimePickerPositioner.displayName = 'TimePickerPositioner'
