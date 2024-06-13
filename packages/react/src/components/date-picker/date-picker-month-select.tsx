import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export type DatePickerMonthSelectBaseProps = {}
export interface DatePickerMonthSelectProps
  extends HTMLArkProps<'select'>,
    DatePickerMonthSelectBaseProps {}

export const DatePickerMonthSelect = forwardRef<HTMLSelectElement, DatePickerMonthSelectProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.getMonthSelectProps(), props)

    return (
      <ark.select {...mergedProps} ref={ref}>
        {datePicker.getMonths().map((month, i) => (
          <option key={i} value={month.value}>
            {month.label}
          </option>
        ))}
      </ark.select>
    )
  },
)

DatePickerMonthSelect.displayName = 'DatePickerMonthSelect'
