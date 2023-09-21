import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerNextTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerNextTrigger = forwardRef<HTMLButtonElement, DatePickerNextTriggerProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.getNextTriggerProps({ view: api.view }), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerNextTrigger.displayName = 'DatePickerNextTrigger'
