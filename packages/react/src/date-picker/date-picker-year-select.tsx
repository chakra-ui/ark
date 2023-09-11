import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerYearSelectProps = HTMLArkProps<'select'>

export const DatePickerYearSelect = forwardRef<HTMLSelectElement, DatePickerYearSelectProps>(
  (props, ref) => {
    const { yearSelectProps } = useDatePickerContext()
    const mergedProps = mergeProps(yearSelectProps, props)

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

export interface YearsRange {
  from: number
  to: number
}

export function getYearsRange(range: YearsRange) {
  const years: number[] = []

  for (let year = range.from; year <= range.to; year += 1) {
    years.push(year)
  }

  return years
}
