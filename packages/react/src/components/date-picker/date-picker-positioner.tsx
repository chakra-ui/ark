import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export type DatePickerPositionerBaseProps = {}
export interface DatePickerPositionerProps
  extends HTMLArkProps<'div'>,
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
