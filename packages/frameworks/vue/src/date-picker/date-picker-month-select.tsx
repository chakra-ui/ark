import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerMonthSelectProps extends HTMLArkProps<'select'> {}

export const DatePickerMonthSelect = defineComponent({
  name: 'DatePickerMonthSelect',
  setup(_, { attrs }) {
    const api = useDatePickerContext()

    return () => (
      <ark.select {...api.value.monthSelectProps} {...attrs}>
        {api.value.getMonths().map((month, i) => (
          <option key={i} value={month.value}>
            {month.label}
          </option>
        ))}
      </ark.select>
    )
  },
})
