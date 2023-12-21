import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerYearSelectProps extends HTMLArkProps<'select'> {}

export const DatePickerYearSelect = defineComponent({
  name: 'DatePickerYearSelect',
  setup(_, { attrs }) {
    const api = useDatePickerContext()

    return () => (
      <ark.select {...api.value.yearSelectProps} {...attrs}>
        {getYearsRange({ from: 1_000, to: 4_000 }).map((year, i) => (
          <option key={i} value={year}>
            {year}
          </option>
        ))}
      </ark.select>
    )
  },
})

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
