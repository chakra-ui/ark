import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerMonthSelectProps extends HTMLArkProps<'select'> {}

export const DatePickerMonthSelect = forwardRef<HTMLSelectElement, DatePickerMonthSelectProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const mergedProps = mergeProps(context.monthSelectProps, props)

    return (
      <ark.select {...mergedProps} ref={ref}>
        {context.getMonths().map((month, i) => (
          <option key={i} value={month.value}>
            {month.label}
          </option>
        ))}
      </ark.select>
    )
  },
)

DatePickerMonthSelect.displayName = 'DatePickerMonthSelect'
