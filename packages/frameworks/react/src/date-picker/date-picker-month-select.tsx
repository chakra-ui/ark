import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerMonthSelectProps extends HTMLArkProps<'select'> {}

export const DatePickerMonthSelect = forwardRef<HTMLSelectElement, DatePickerMonthSelectProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.monthSelectProps, props)

    return (
      <ark.select {...mergedProps} ref={ref}>
        {api.getMonths().map((month, i) => (
          <option key={i} value={month.value}>
            {month.label}
          </option>
        ))}
      </ark.select>
    )
  },
)

DatePickerMonthSelect.displayName = 'DatePickerMonthSelect'
