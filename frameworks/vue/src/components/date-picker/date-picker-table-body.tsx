import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-context'

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
