import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerClearTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerClearTrigger = forwardRef<HTMLButtonElement, DatePickerClearTriggerProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerClearTrigger.displayName = 'DatePickerClearTrigger'
