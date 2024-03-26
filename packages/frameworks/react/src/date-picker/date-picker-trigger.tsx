import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const mergedProps = mergeProps(context.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerTrigger.displayName = 'DatePickerTrigger'
