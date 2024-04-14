import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableHeaderProps extends HTMLArkProps<'th'> {}

export const DatePickerTableHeader = defineComponent<DatePickerTableHeaderProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const table = useDatePickerTableContext()

    return () => (
      <ark.th {...api.value.getTableHeaderProps(table)} {...attrs}>
        {slots.default?.()}
      </ark.th>
    )
  },
  {
    name: 'DatePickerTableHeader',
  },
)
