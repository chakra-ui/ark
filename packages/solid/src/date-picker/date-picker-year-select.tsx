import { mergeProps } from '@zag-js/solid'
import { For } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerYearSelectProps = HTMLArkProps<'select'>

export const DatePickerYearSelect = (props: DatePickerYearSelectProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().yearSelectProps, props)

  return (
    <ark.select {...mergedProps}>
      <For each={getYearsRange({ from: 1_000, to: 4_000 })}>
        {(year) => <option value={year}>{year}</option>}
      </For>
    </ark.select>
  )
}

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
