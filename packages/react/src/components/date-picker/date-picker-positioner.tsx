import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerPositionerBaseProps extends PolymorphicProps {}
export interface DatePickerPositionerProps
  extends HTMLAttributes<HTMLDivElement>,
    DatePickerPositionerBaseProps {}

export const DatePickerPositioner = forwardRef<HTMLDivElement, DatePickerPositionerProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.getPositionerProps(), props)
    const presence = usePresenceContext()

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerPositioner.displayName = 'DatePickerPositioner'
