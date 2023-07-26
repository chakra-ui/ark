import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerMonthSelectProps = HTMLArkProps<'select'>

export const DatePickerMonthSelect = forwardRef<'select', DatePickerMonthSelectProps>(
  (props, ref) => {
    const { monthSelectProps, getMonths } = useDatePickerContext()
    const mergedProps = mergeProps(monthSelectProps, props)

    return (
      <ark.select {...mergedProps} ref={ref}>
        {getMonths().map((month, i) => (
          <option key={i} value={month.value}>
            {month.label}
          </option>
        ))}
      </ark.select>
    )
  },
)
