import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableBodyProps extends HTMLArkProps<'tbody'> {}

export const DatePickerTableBody = defineComponent<DatePickerTableBodyProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()

    return () => (
      <ark.tbody {...api.value.getTableBodyProps(tableProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.tbody>
    )
  },
  {
    name: 'DatePickerTableBody',
  },
)
