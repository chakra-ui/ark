import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerYearSelectProps extends HTMLArkProps<'select'> {}

export const DatePickerYearSelect = forwardRef<HTMLSelectElement, DatePickerYearSelectProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.yearSelectProps, props)

    return (
      <ark.select {...mergedProps} ref={ref}>
        {getYearsRange({ from: 1_000, to: 4_000 }).map((year, i) => (
          <option key={i} value={year}>
            {year}
          </option>
        ))}
      </ark.select>
    )
  },
)

DatePickerYearSelect.displayName = 'DatePickerYearSelect'

interface YearsRange {
  from: number
  to: number
}

function getYearsRange(range: YearsRange) {
  const years: number[] = []

  for (let year = range.from; year <= range.to; year += 1) {
    years.push(year)
  }

  return years
}
