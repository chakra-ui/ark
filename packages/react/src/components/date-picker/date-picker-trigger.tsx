import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerTrigger.displayName = 'DatePickerTrigger'
