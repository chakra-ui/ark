import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerYearSelectBaseProps extends PolymorphicProps<'select'> {}
export interface DatePickerYearSelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement>,
    DatePickerYearSelectBaseProps {}

export const DatePickerYearSelect = (props: DatePickerYearSelectProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getYearSelectProps(), props)

  return (
    <ark.select {...mergedProps}>
      {getYearsRange({ from: 1_000, to: 4_000 }).map((year) => (
        <option value={year}>{year}</option>
      ))}
    </ark.select>
  )
}

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
