import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerTrigger.displayName = 'DatePickerTrigger'
