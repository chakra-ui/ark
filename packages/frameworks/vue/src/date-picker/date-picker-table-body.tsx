import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableBodyProps extends HTMLArkProps<'tbody'> {}

export const DatePickerTableBody = defineComponent<DatePickerTableBodyProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const table = useDatePickerTableContext()

    return () => (
      <ark.tbody {...api.value.getTableBodyProps(table)} {...attrs}>
        {slots.default?.()}
      </ark.tbody>
    )
  },
  {
    name: 'DatePickerTableBody',
  },
)
