import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerClearTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerClearTrigger = forwardRef<HTMLButtonElement, DatePickerClearTriggerProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const mergedProps = mergeProps(context.clearTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerClearTrigger.displayName = 'DatePickerClearTrigger'
