import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerMonthSelectProps = ComponentPropsWithoutRef<typeof ark.select>

export const DatePickerMonthSelect = forwardRef<HTMLSelectElement, DatePickerMonthSelectProps>(
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

DatePickerMonthSelect.displayName = 'DatePickerMonthSelect'
