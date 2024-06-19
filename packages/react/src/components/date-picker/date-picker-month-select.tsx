import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps {}
export interface DatePickerMonthSelectProps
  extends HTMLProps<'select'>,
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
