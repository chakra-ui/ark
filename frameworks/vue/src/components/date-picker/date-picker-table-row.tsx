import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-context'

export interface DatePickerTableRowProps extends HTMLArkProps<'tr'> {}

export const DatePickerTableRow = defineComponent<DatePickerTableRowProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const table = useDatePickerTableContext()

    return () => (
      <ark.tr {...api.value.getTableRowProps(table)} {...attrs}>
        {slots.default?.()}
      </ark.tr>
    )
  },
  {
    name: 'DatePickerTableRow',
  },
)
