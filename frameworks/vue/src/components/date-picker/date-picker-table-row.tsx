import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableRowProps extends HTMLArkProps<'tr'> {}

export const DatePickerTableRow = defineComponent<DatePickerTableRowProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()

    return () => (
      <ark.tr {...api.value.getTableRowProps(tableProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.tr>
    )
  },
  {
    name: 'DatePickerTableRow',
  },
)
