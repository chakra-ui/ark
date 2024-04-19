import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableHeadProps extends HTMLArkProps<'thead'> {}

export const DatePickerTableHead = defineComponent<DatePickerTableHeadProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()

    return () => (
      <ark.thead {...api.value.getTableHeadProps(tableProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.thead>
    )
  },
  {
    name: 'DatePickerTableHead',
  },
)
