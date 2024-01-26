import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerYearSelectProps extends HTMLArkProps<'select'> {}

export const DatePickerYearSelect: ArkComponent<'select'> = (props) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().yearSelectProps, props)

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
