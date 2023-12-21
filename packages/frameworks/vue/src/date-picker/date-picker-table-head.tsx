import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableHeadProps extends HTMLArkProps<'thead'> {}

export const DatePickerTableHead = defineComponent({
  name: 'DatePickerTableHead',
  setup(_, { attrs, slots }) {
    const api = useDatePickerContext()
    const table = useDatePickerTableContext()

    return () => (
      <ark.thead {...api.value.getTableHeadProps(table)} {...attrs}>
        {slots.default?.()}
      </ark.thead>
    )
  },
})
